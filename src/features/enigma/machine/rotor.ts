import { aCode, isValidRotorWiring, modulo } from "../utils.ts";

export class RotorError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * The Rotor class represents the Enigma Machine rotors (Walzen).
 *
 * A rotor has 26 circularly arranged pins on the right (entry) side and 26
 * contacts on the left side. Each pin is connected to a single contact by
 * internal wiring, thus establishing a substitution cipher. We represent this
 * wiring by establishing a mapping from a pin to a contact (and vice versa for
 * the return path). Internally we number the pins and contacts from 0-25 in a
 * clockwise manner with 0 being the "top".
 *
 * An alphabetic or numeric ring is fastened to the rotor by the operator. The
 * labels of this ring are displayed to the operator through a small window on
 * the top panel. The ring can be fixed to the rotor in one of 26 different
 * positions; this is called the ring setting (Ringstellung). We will number
 * the ring settings from 0-25 where 0 means no offset (e.g. the letter "A" is
 * mapped to pin 0 on an alphabetic ring). A ring setting of 1 means the letter
 * "B" is mapped to pin 0.
 *
 * Each rotor can be in one of 26 positions on the spindle, with position 0
 * where pin/contact 0 is being indicated in the operator window. The rotor
 * rotates towards the operator by mechanical means during normal operation as
 * keys are being pressed during data entry. Position 1 is thus defined to be
 * one step from position 0. Likewise, position 25 is the last position before
 * another step returns it to position 0, completing 1 trip around the spindle.
 *
 * Finally, a rotor has a "stepping" or "turnover" parameter. Physically this
 * is implemented by putting a notch on the alphabet ring. This notch controls
 * when the rotor will "kick" the rotor to its left, causing the neighbor rotor
 * to rotate. Most rotors had one notch, but some Kriegsmarine rotors had 2
 * notches and thus rotated twice as fast.
 *
 * Note that due to the system of ratchets and pawls, the middle rotor (2nd from
 * the right) can "double-step". The middle rotor will advance on the next
 * step of the first rotor a second time in a row, if the middle rotor is in
 * its own turnover position.
 *
 * Note that we allow the stepping parameter to be null. This indicates the
 * rotor does not rotate, as is the case for the M4 "Greek" rotors.
 * This also allows us to model the entry wheel and reflectors as stationary
 * rotors.
 */
export default class Rotor {
  readonly type: string;
  readonly wiring: string;
  readonly ringSetting: number;

  private pos = 0;
  private rotationCount = 0;
  private entryMap = new Array<number>(26);
  private exitMap = new Array<number>(26);
  private posByDisplay = new Map<string, number>();
  private displayByPos = new Map<number, string>();
  private stepSet = new Set<string>();

  /**
   * Constructor for Rotor.
   *
   * @param type {string} - the name or type of the Rotor; e.g. "II"
   *
   * @param wiring {string} - the wiring of the rotor as a 26 character string
   * consisting of all uppercase letters A-Z. The first letter of the string
   * indicates what the "A" pin maps to, the second letter is for "B", etc.
   *
   * @param ringSetting {string|number} - the ring setting can be specified as
   * a number from 0-25 or a single uppercase letter string. If omitted, a value
   * of 0 is used.
   *
   * @param stepping {string[]} - an array of single uppercase strings which
   * indicate when the rotor steps if the ring setting is set to 0.
   * The rotor will step when the indicated letters are shown in the operator
   * window.
   * An empty list indicates the rotor does not rotate.
   */
  constructor(
    type: string,
    wiring: string,
    ringSetting?: number | string,
    stepping: string[] = [],
  ) {
    this.type = type;
    this.wiring = wiring.toUpperCase();

    if (ringSetting === undefined) {
      this.ringSetting = 0;
    } else if (typeof ringSetting === "number") {
      this.ringSetting = ringSetting;
    } else {
      if (!/^[A-Z]$/.test(ringSetting)) {
        throw new RotorError(`Invalid ringSetting ${ringSetting}`);
      }
      this.ringSetting = ringSetting.charCodeAt(0) - aCode;
    }

    if (!isValidRotorWiring(this.wiring)) {
      throw new RotorError(`Invalid wiring ${this.wiring}`);
    }

    if (this.ringSetting < 0 || this.ringSetting > 25) {
      throw new RotorError(`Invalid ringSetting ${ringSetting}`);
    }

    // Build entry and exit wiring mappings.
    // Two arrays are used for fast lookup in both directions.
    for (let i = 0; i < 26; ++i) {
      const n = this.wiring.charCodeAt(i) - aCode;
      this.entryMap[i] = n;
      this.exitMap[n] = i;
    }

    // Build a mapping of display letter -> position
    // and the reverse mapping of position -> display letter.
    for (let i = 0; i < 26; ++i) {
      const display = String.fromCharCode(aCode + i);
      const pos = modulo(i - this.ringSetting, 26);
      this.posByDisplay.set(display, pos);
      this.displayByPos.set(pos, display);
    }

    // Check stepping for validity.
    for (const step of stepping) {
      if (/^[A-Z]$/.test(step)) {
        this.stepSet.add(step);
      } else {
        throw new RotorError(`Invalid step ${step}`);
      }
    }
  }

  /**
   * Spin the rotor such that the string val appears in the operator
   * window.
   *
   * This sets the internal position of the rotor on the axle and thus
   * rotates the pins and contacts accordingly.
   *
   * A value of 'A' for example puts the rotor in position 0, assuming an
   * internal ring setting of 0.
   *
   * The parameter val must be a string in 'A' - 'Z'.
   * Setting the display resets the internal rotation counter to 0.
   *
   * @param c {string} - the letter to display in the operator window
   */
  setDisplay(c: string) {
    const newPos = this.posByDisplay.get(c);
    if (newPos === undefined) {
      throw new RotorError(`setDisplay: invalid value ${c}`);
    }
    this.pos = newPos;
    this.rotationCount = 0;
  }

  /**
   * Returns what is currently displayed in the operator window.
   */
  getDisplay() {
    const c = this.displayByPos.get(this.pos);
    if (c === undefined) {
      throw new RotorError(`getDisplay: rotor in invalid position ${this.pos}`);
    }
    return c;
  }

  /**
   * Simulate a signal entering the rotor from the right at a given pin
   * position n.
   *
   * @param n {number} - pin the signal is entering on (0 - 25)
   * @return - the contact number of the output signal (0 - 25)
   */
  signalIn(n: number) {
    // Determine what pin we have at that position due to rotation.
    const pin = modulo(n + this.pos, 26);

    // Run it through the internal wiring.
    const contact = this.entryMap[pin];

    // Turn back into a position due to rotation.
    return modulo(contact - this.pos, 26);
  }

  /**
   * Simulate a signal entering the rotor from the left at a given contact
   * position n.
   *
   * @param n {number} - contact the signal is entering on (0 - 25)
   * @return - the pin of the output signal (0 - 25)
   */
  signalOut(n: number) {
    // Determine what contact we have at that position due to rotation.
    const contact = modulo(n + this.pos, 26);

    // Run it through the internal wiring.
    const pin = this.exitMap[contact];

    // Turn back into a position due to rotation.
    return modulo(pin - this.pos, 26);
  }

  /**
   * Returns true if the rotor has a notch in a stepping position.
   */
  isNotchOverPawl() {
    return this.stepSet.has(this.getDisplay());
  }

  /**
   * Rotate the rotor forward due to mechanical stepping action.
   */
  rotate() {
    this.pos = (this.pos + 1) % 26;
    ++this.rotationCount;
  }
}
