import type { SwitchType } from "../models/switchType.ts";
import { DECRYPT_DATA, ENCRYPT_DATA } from "./data.ts";

export class Switch {
  private readonly decryptWiring: number[][];
  private readonly encryptWiring: number[][];
  private pos: number = 0;
  private readonly numPositions: number;
  private readonly numLevels: number;

  /**
   * Factory function for building a stepping switch of a particular type.
   *
   * @param switchType - the type of switch to build
   * @param pos - the initial switch position
   * @returns the newly constructed switch
   */
  static factory(switchType: SwitchType, pos: number): Switch {
    return new Switch(
      DECRYPT_DATA[switchType]!,
      ENCRYPT_DATA[switchType]!,
      pos,
    );
  }

  /**
   * Constructor for Switch.
   *
   * @param decryptWiring - the decrypt wiring table
   * @param encryptWiring - the encrypt wiring table
   * @param pos - the initial switch position
   * @throws RangeError - if pos is out of range
   */
  constructor(
    decryptWiring: number[][],
    encryptWiring: number[][],
    pos: number,
  ) {
    this.decryptWiring = decryptWiring;
    this.encryptWiring = encryptWiring;
    this.numPositions = decryptWiring.length;
    this.numLevels = decryptWiring[0]!.length;
    this.setPos(pos);
  }

  /**
   * Sets the switch position to n.
   * @param n - the new switch position
   * @throws RangeError if n is out of range.
   */
  setPos(n: number): void {
    if (n < 0 || n >= this.numPositions) {
      throw new RangeError(`Invalid switch position ${n}`);
    }
    this.pos = n;
  }

  /**
   * Advance the stepping switch position.
   * @returns the new 0-based switch position.
   */
  step(): number {
    this.pos = (this.pos + 1) % this.numPositions;
    return this.pos;
  }

  /**
   * Validates that a level is within range for this switch.
   * @param level - the level to check
   * @throws RangeError if level is out of range.
   */
  private checkLevel(level: number): void {
    if (level < 0 || level >= this.numLevels) {
      throw new RangeError(`Invalid level ${level}`);
    }
  }

  /**
   * Determines the output signal from the stepping switch for the decrypt path.
   *
   * @param level - the integer input level to decrypt
   * @returns the decrypted value.
   * @throws RangeError if level is out of range.
   */
  decrypt(level: number): number {
    this.checkLevel(level);
    return this.decryptWiring[this.pos]![level]!;
  }

  /**
   * Determines the output signal from the stepping switch for the encrypt path.
   *
   * @param level - the integer input level to encrypt
   * @returns the encrypted value.
   * @throws RangeError if level is out of range.
   */
  encrypt(level: number): number {
    this.checkLevel(level);
    return this.encryptWiring[this.pos]![level]!;
  }
}
