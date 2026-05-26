import { modulo } from "../../common/utils.ts";
import { Drum } from "./drum.ts";
import { KeyWheel, KeyWheelError } from "./keyWheel.ts";
import { KEY_WHEEL_DATA } from "./wheelData.ts";

export type ModeType = "cipher" | "decipher";

export interface M209FactoryParams {
  bars: [number, number][];
  pinList: string[];
  initialPositions?: number[];
  counter?: number;
  mode?: ModeType;
}

/**
 * The M209 class is the top-level class in the M-209 simulation. It
 * aggregates key wheels and a drum and orchestrates their movements to provide
 * encrypt and decrypt functions for the operator.
 */
export class M209 {
  private readonly keyWheels: KeyWheel[];
  private readonly drum: Drum;
  private currentMode: ModeType = "cipher";
  private counter: number;
  private static alphabetRegex = /^[A-Z]$/;
  private static cipherTable = Array.from(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ).reverse();
  private static aCode = "A".charCodeAt(0);
  private static maxCounter = 10000;
  private static numBars = 27;
  private static numWheels = 6;

  /**
   * Factory constructor for building a M209 from Redux state.
   *
   * @param params - M209FactoryParams object with bars, pinList, counter, initialPositions, and mode
   */
  static factory = ({
    bars,
    pinList,
    counter,
    initialPositions,
    mode,
  }: M209FactoryParams) => {
    if (bars.length !== M209.numBars) {
      throw new RangeError(
        `Invalid number of bars (${bars.length}), expected ${M209.numBars}`,
      );
    }
    if (pinList.length !== M209.numWheels) {
      throw new RangeError(
        `Invalid number of pin lists (${pinList.length}), expected ${M209.numWheels}`,
      );
    }
    const initPositions = initialPositions ?? [0, 0, 0, 0, 0, 0];
    if (initPositions.length !== M209.numWheels) {
      throw new RangeError(
        `Invalid number of initial positions (${initPositions.length}), expected ${M209.numWheels}`,
      );
    }

    const keyWheels = Array.from(
      { length: 6 },
      (_, i) =>
        new KeyWheel(
          KEY_WHEEL_DATA[i]!.letters,
          KEY_WHEEL_DATA[i]!.guideLetter,
        ),
    );
    for (const [n, pins] of pinList.entries()) {
      keyWheels[n]!.setPins(pins);
    }

    const drum = new Drum(bars);
    const m209 = new M209(keyWheels, drum, counter, mode);

    const display: string[] = [];
    for (const [n, pos] of initPositions.entries()) {
      display.push(KEY_WHEEL_DATA[n]!.letters[pos]!);
    }
    m209.setKeyWheels(display.join(""));

    return m209;
  };

  /**
   * M209 constructor
   *
   * @param keyWheels - 6 element array of KeyWheels
   * @param drum - the drum cage
   * @param counter - initial counter value
   * @param mode - initial cipher/decipher mode
   */
  constructor(
    keyWheels: KeyWheel[],
    drum: Drum,
    counter?: number,
    mode?: ModeType,
  ) {
    this.keyWheels = keyWheels;
    this.drum = drum;
    this.counter = counter ?? 0;
    this.mode = mode ?? "cipher";

    if (keyWheels.length !== 6) {
      throw new RangeError("Must have 6 key wheels");
    }
  }

  /**
   * Sets the key wheel n to the letter c, where n is 0-5, inclusive.
   *
   * Key wheel 0 is the leftmost wheel and 5 is the rightmost.
   *
   * @param n {number} - key wheel to change, must be 0-5, inclusive.
   * @param c {string} - the letter to set the key wheel to.
   * Must be a letter that appears on the key wheel specified by n.
   *
   */
  setKeyWheel(n: number, c: string): void {
    if (n < 0 || n >= this.keyWheels.length) {
      throw new RangeError(`Invalid key wheel ${n}`);
    }
    this.keyWheels[n]!.setLetter(c);
  }

  /**
   * Sets the key wheels from left to right to the 6-letter string `s`.
   *
   * @param s {string} - 6-letter string to set the wheels to
   */
  setKeyWheels(s: string): void {
    if (s.length !== 6) {
      throw new RangeError("Setting must have length of 6");
    }
    for (let i = 0; i < s.length; i++) {
      try {
        this.setKeyWheel(i, s[i]!);
      } catch (error) {
        if (error instanceof KeyWheelError) {
          throw new KeyWheelError(`wheel #${i}: ${error.message}`);
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Returns the current key wheel display as a 6-letter string.
   */
  display(): string {
    return this.keyWheels.map((w) => w.display()).join("");
  }

  /**
   * Returns the current key wheel positions as a 6-element number array.
   */
  wheelPositions(): number[] {
    const result: number[] = [];
    for (const wheel of this.keyWheels) {
      result.push(wheel.position());
    }
    return result;
  }

  /**
   * Gets the current letter counter value.
   *
   * @returns {number} - the current number of letters that have been enciphered
   * or deciphered since the last reset.
   */
  get letterCount(): number {
    return this.counter;
  }

  /**
   * Resets the current letter counter to zero by rotating the main axle.
   */
  resetLetterCounter(): void {
    const steps =
      this.counter <= M209.maxCounter / 2
        ? -this.counter
        : M209.maxCounter - this.counter + 1;
    this.rotateMainAxle(steps);
  }

  /**
   * Rotates the main axle the given number of steps.
   *
   * @param steps {number|undefined} - The number of steps to rotate. If negative,
   * indicates the main axle should be rolled backwards. If not supplied, the main
   * axle is rotated one step forward.
   */
  rotateMainAxle(steps?: number): void {
    if (steps === 0) return;

    const n = steps ?? 1;
    for (const wheel of this.keyWheels) {
      wheel.rotate(n);
    }
    this.counter = modulo(this.counter + n, M209.maxCounter);
  }

  /**
   * Returns the current mode of the M-209 converter.
   *
   * @returns {ModeType} - current operating mode
   */
  get mode(): ModeType {
    return this.currentMode;
  }

  /**
   * Sets the current operating mode.
   *
   * In `cipher` mode, all output is returned in 5-letter groups.
   * In `decipher` mode, output is not grouped, and the letter 'Z' is
   * printed as a space.
   *
   * @param mode {ModeType} - the new mode
   */
  set mode(mode: ModeType) {
    this.currentMode = mode;
  }

  /**
   * Converts the supplied text by performing the mechanical substitution cipher
   * over it.
   *
   * If the converter is in `cipher` mode, output will be printed in 5-letter groups.
   * Otherwise (`decipher` mode), the output will not be grouped, and all 'Z'
   * letters will be replaced with space characters.
   *
   * @param text {string} the text to convert
   * @returns {string} the converted text
   */
  convert(text: string): string {
    const convertedText: string[] = [];
    for (const c of text) {
      convertedText.push(this.cipher(c));
    }

    return this.currentMode == "cipher"
      ? M209.groupText(convertedText)
      : convertedText.join("").replaceAll("Z", " ");
  }

  /**
   * Simulate a cipher operation on the device:
   * - The input letter is read and checked for validity.
   * - The guide arm positions are calculated from the current effective pins
   *   on the key wheels.
   * - The drum is rotated against the guide arms to produce a drum count.
   * - The key wheels are rotated one step.
   * - The letter counter is incremented.
   * - The output letter is computed from the input letter, the drum count, and
   *   the internal substitution table.
   *
   * @param c {string} - the letter to be enciphered
   * @returns {string} - the enciphered result letter
   */
  private cipher(c: string): string {
    if (!M209.alphabetRegex.test(c)) {
      throw new RangeError(`Invalid cipher letter ${c}`);
    }
    const pins = this.keyWheels.map((w) => w.isEffective());
    const count = this.drum.rotate(pins);

    for (const wheel of this.keyWheels) {
      wheel.rotate();
    }
    this.counter = modulo(this.counter + 1, M209.maxCounter);

    return M209.cipherTable[modulo(c.charCodeAt(0) - M209.aCode - count, 26)]!;
  }

  /**
   * Converts an array of letters into a string of 5-letter groups.
   *
   * @param text {string[]} - the text to group
   * @returns {string} - the text as a string in 5-letter, space-delimited groups
   */
  private static groupText(text: string[]): string {
    const groups: string[] = [];
    for (let i = 0; i < text.length; i += 5) {
      groups.push(text.slice(i, i + 5).join(""));
    }
    return groups.join(" ");
  }
}
