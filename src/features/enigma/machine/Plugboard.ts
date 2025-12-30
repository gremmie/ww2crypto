import {
  aCode,
  isValidPlugboardString,
  normalizePlugboardString,
} from "../utils.ts";

export class PlugboardError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * The plugboard allows the operator to swap letters before and after the
 * entry wheel. This is accomplished by connecting cables between pairs of
 * plugs that are marked with letters (Heer & Luftwaffe models), both letters
 * and numbers (Kriegsmarine M1-M3), or numbers (Kriegsmarine M4).
 *
 * During WW2, procedure dictated that 10 cables be used to set up the machine.
 * This simulation supports using 0 to 13 cables.
 *
 * Each cable swaps both the input and output signals. Thus, if A is connected
 * to B, A crosses to B in the keyboard to entry wheel direction and also in
 * the reverse entry wheel to lamp direction.
 */
export default class Plugboard {
  private readonly wiringMap: number[];

  /**
   * Constructs a Plugboard from an alphabetical connection string that specifies
   * the wiring.
   * @param {string} s -Alphabetical connection string
   *
   * Example: "AV BS CG DL FU HZ IN KM OW RX".
   * The connection string can have no more than 13 pairs.
   * An empty connection string specifies no cables are in use.
   */
  constructor(s: string) {
    const parts = s === "" ? [] : s.replaceAll(/\s+/g, " ").split(" ");
    if (parts.length > 13) {
      throw new PlugboardError(`Invalid connection string ${s}`);
    }
    if (!isValidPlugboardString(s, parts.length)) {
      throw new PlugboardError(`Invalid connection string ${s}`);
    }
    const pairs = normalizePlugboardString(s).split(" ");
    this.wiringMap = Array.from({ length: 26 }, (_, i) => i);

    for (let i = 0; i < pairs.length; ++i) {
      const m = pairs[i].charCodeAt(0) - aCode;
      const n = pairs[i].charCodeAt(1) - aCode;
      this.wiringMap[m] = n;
      this.wiringMap[n] = m;
    }
  }

  /**
   * Simulate a signal entering the plugboard on wire n, where n must be
   * a number between 0 and 25.
   *
   * Returns the wire number of the output signal (0-25).
   *
   * Note that since the plugboard always crosses pairs of wires, it doesn't
   * matter what direction (keyboard -> entry wheel or vice versa) the signal
   * is coming from.
   *
   * @param {number} n - The input wire number (0 - 25).
   * @returns {number} - The wire number of the output signal (0-25).
   */
  signal(n: number): number {
    return this.wiringMap[n];
  }
}
