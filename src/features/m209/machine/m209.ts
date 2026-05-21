import { modulo } from "../../common/utils.ts";
import type Drum from "./drum.ts";
import KeyWheel, { KeyWheelError } from "./keyWheel.ts";

export type ModeType = "cipher" | "decipher";

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

  constructor(keyWheels: KeyWheel[], drum: Drum) {
    this.keyWheels = keyWheels;
    this.drum = drum;
    this.counter = 0;

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
   * Gets the current letter counter value.
   *
   * @returns {number} - the current number of letters that have been enciphered
   * or deciphered since the last reset.
   */
  get letterCount(): number {
    return this.counter;
  }

  /**
   * Resets the current letter counter to zero.
   */
  resetLetterCounter(): void {
    this.counter = 0;
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
    ++this.counter;

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
