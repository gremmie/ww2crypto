import { aCode } from "../utils.ts";
import Plugboard from "./plugboard.ts";
import type Rotor from "./rotor.ts";

export class EnigmaMachineError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default class EnigmaMachine {
  private static validKeyPattern = /^[A-Z]$/;
  private readonly reflector: Rotor;
  private readonly rotors: Rotor[];
  private readonly plugboard: Plugboard;

  /**
   * Configures the Enigma Machine.
   *
   * @param reflector {Rotor} - a Rotor object to represent the reflector (UKW).
   * @param rotors {Rotor[]} - a list containing 3 or 4 Rotor objects. The order is important.
   * The first rotor is the leftmost rotor, and the last rotor is the rightmost, from the
   * operator's perspective.
   * @param plugboard {Plugboard} - a plugboard object to represent the plugboard wiring.
   *
   * Note that on the military Enigma machines we are simulating, the entry
   * wheel is a simple straight-pass through and is not simulated here. It
   * would not be too hard to add a parameter for the entry wheel and pass a
   * Rotor object for it if it is desired to simulate a non-military Enigma
   * machine.
   */
  constructor(
    reflector: Rotor,
    rotors: Rotor[],
    plugboard: Plugboard = new Plugboard(""),
  ) {
    if (rotors.length !== 3 && rotors.length !== 4) {
      throw new EnigmaMachineError("Must supply 3 or 4 rotors");
    }
    this.reflector = reflector;
    this.rotors = rotors;
    this.plugboard = plugboard;
  }

  /**
   * Sets the rotor display to 'value'.
   *
   * @param value {string} - the value to display in the rotor windows from
   * left to right.
   */
  setDisplay(value: string) {
    if (value.length !== this.rotors.length) {
      throw new EnigmaMachineError(
        `Display value should have a length of ${this.rotors.length}`,
      );
    }
    for (let i = 0; i < this.rotors.length; ++i) {
      this.rotors[i].setDisplay(value[i]);
    }
  }

  /**
   * Returns the operator display as a string.
   */
  getDisplay() {
    let value = "";
    for (const rotor of this.rotors) {
      value += rotor.getDisplay();
    }
    return value;
  }

  /**
   * Simulate a front panel key press.
   *
   * @param key {string} - a string representing the key pressed. Must be a
   * single letter in A-Z.
   */
  keyPress(key: string) {
    if (!EnigmaMachine.validKeyPattern.test(key)) {
      throw new EnigmaMachineError(`Illegal key press ${key}`);
    }
    this.stepRotors();
    const signalNumber = key.charCodeAt(0) - aCode;
    const lampNumber = this.electricSignal(signalNumber);

    return String.fromCharCode(lampNumber + aCode);
  }

  /**
   * Run the text through the machine, simulating a key press for each letter
   * in the text.
   *
   * @param text {string} - the text to process. Note the text is converted to
   * uppercase before processing.
   *
   * @param replaceChar {string} - if text contains a character not on the keyboard
   * (A-Z) replace it with replaceChar. If replaceChar is null, the character
   * is dropped. replaceChar should be a single char in the range of A-Z.
   */
  processText(text: string, replaceChar: string | null = "X") {
    if (
      replaceChar !== null &&
      !EnigmaMachine.validKeyPattern.test(replaceChar)
    ) {
      throw new EnigmaMachineError(`Invalid replace char ${replaceChar}`);
    }

    const result: string[] = [];
    for (const c of text) {
      let key = c.toUpperCase();
      if (!EnigmaMachine.validKeyPattern.test(key)) {
        if (replaceChar !== null) {
          key = replaceChar;
        } else {
          continue;
        }
      }
      result.push(this.keyPress(key));
    }
    return result.join("");
  }

  /**
   * Simulate the mechanical action of pressing a key.
   *
   * The right-most rotor's right-side ratchet is always over a pawl, and
   * it has no neighbor to the right, so it always rotates.
   *
   * The middle rotor will rotate if either:
   *   1) The right-most rotor's left side notch is over the 2nd pawl
   *       or
   *   2) It has a left-side notch over the 3rd pawl
   *
   * The third rotor (from the right) will rotate only if the middle rotor
   * has a left-side notch over the 3rd pawl.
   *
   * Kriegsmarine model M4 has 4 rotors, but the 4th rotor (the leftmost)
   * does not rotate (they did not add a 4th pawl to the mechanism).
   */
  private stepRotors() {
    const rotor1 = this.rotors[this.rotors.length - 1];
    const rotor2 = this.rotors[this.rotors.length - 2];
    const rotor3 = this.rotors[this.rotors.length - 3];

    // Decide which rotors can move.
    const rotate2 = rotor1.isNotchOverPawl() || rotor2.isNotchOverPawl();
    const rotate3 = rotor2.isNotchOverPawl();

    // Move rotors.
    rotor1.rotate();
    if (rotate2) rotor2.rotate();
    if (rotate3) rotor3.rotate();
  }

  /**
   * Simulate running an electric signal through the machine in order to
   * perform an encrypt or decrypt operation.
   *
   * @param signalNumber {number} - the wire (0-25) that the simulated current occurs on
   * @returns {number} - a lamp number to light (0-25)
   */
  private electricSignal(signalNumber: number): number {
    let pos = this.plugboard.signal(signalNumber);

    for (let i = this.rotors.length - 1; i >= 0; --i) {
      pos = this.rotors[i].signalIn(pos);
    }

    pos = this.reflector.signalIn(pos);

    for (const rotor of this.rotors) {
      pos = rotor.signalOut(pos);
    }

    return this.plugboard.signal(pos);
  }
}
