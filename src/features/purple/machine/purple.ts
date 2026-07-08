import type { SwitchOrder } from "../models/switchOrder.ts";
import { SwitchType } from "../models/switchType.ts";
import { isValidPlugboardStr } from "../utils.ts";
import type { Mode } from "./mode.ts";
import { Switch } from "./switch.ts";

interface PurpleOptions {
  switchPositions?: number[];
  switchOrder?: SwitchOrder;
  plugboard?: string;
  mode?: Mode;
}

/**
 *  This class simulates the top-level behavior of the PURPLE cipher
 *  machine, known to the Japanese as "Cipher Machine 97".
 */
export class Purple {
  private static validLetter = /^[A-Z]$/;
  private readonly sixes: Switch;
  private readonly twenties: Switch[];
  private mode: Mode;
  private readonly alphabet: string;
  private fastSwitch: Switch;
  private middleSwitch: Switch;
  private slowSwitch: Switch;

  constructor({
    switchPositions,
    switchOrder,
    plugboard,
    mode,
  }: PurpleOptions) {
    switchPositions ??= [0, 0, 0, 0];
    switchOrder ??= "1-2-3";
    plugboard ??= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (switchPositions.length != 4) {
      throw new RangeError("switchPositions must have 4 values");
    }
    if (!switchPositions.every((pos) => pos >= 0 && pos <= 24)) {
      throw new RangeError(`Invalid switch positions: ${switchPositions}`);
    }
    if (!isValidPlugboardStr(plugboard)) {
      throw new RangeError(`Invalid plugboard string: ${plugboard}`);
    }

    this.mode = mode ?? "encrypt";
    this.alphabet = plugboard;

    this.sixes = Switch.factory(SwitchType.Sixes, switchPositions[0]!);
    this.twenties = [
      Switch.factory(SwitchType.Twenties1, switchPositions[1]!),
      Switch.factory(SwitchType.Twenties2, switchPositions[2]!),
      Switch.factory(SwitchType.Twenties3, switchPositions[3]!),
    ];

    const parts = switchOrder.split("-").map((s) => parseInt(s) - 1);
    this.fastSwitch = this.twenties[parts[0]!]!;
    this.middleSwitch = this.twenties[parts[1]!]!;
    this.slowSwitch = this.twenties[parts[2]!]!;
  }

  /**
   * Sets the operational mode of the machine.
   *
   * @param mode - either "encrypt" or "decrypt"
   */
  setMode(mode: Mode): void {
    this.mode = mode;
  }

  /**
   * Returns the current operational mode of the machine.
   * @returns the current mode, either "encrypt" or "decrypt"
   */
  getMode(): Mode {
    return this.mode;
  }

  /**
   * Processes the given text according to the current encrypt/decrypt mode.
   *
   * @param text - the text to process; must all be A-Z or, in decrypt mode only,
   * "-" to indicate a garbled letter.
   * @returns the processed text, with the same length as the input.
   * @throws RangeError if the text contains invalid characters.
   */
  processText(text: string): string {
    return this.mode === "encrypt" ? this.encrypt(text) : this.decrypt(text);
  }

  /**
   * Encrypts the given plaintext and returns the resulting ciphertext.
   *
   * @param plaintext - the text to encrypt; must all be A-Z
   * @returns the resulting ciphertext
   * @throws RangeError if the plaintext contains invalid characters.
   */
  private encrypt(plaintext: string): string {
    const ciphertext: string[] = [];
    for (const c of plaintext) {
      if (!Purple.validLetter.test(c)) {
        throw new RangeError(`Invalid character in plaintext: ${c}`);
      }
      const n = this.alphabet.indexOf(c);
      let x: number;
      if (n < 6) {
        // This input goes to the sixes switch.
        x = this.sixes.encrypt(n);
      } else {
        // This input goes through the sequence of twenties switches in reverse
        // order compared to the decrypt path.
        const i = n - 6;
        x =
          this.twenties[2]!.encrypt(
            this.twenties[1]!.encrypt(this.twenties[0]!.encrypt(i)),
          ) + 6;
      }
      ciphertext.push(this.alphabet[x]!);
      this.step();
    }
    return ciphertext.join("");
  }

  /**
   * Decrypts the given ciphertext and returns the resulting plaintext.
   *
   * @param ciphertext - the text to decrypt; must all be A-Z or - to indicate a garbled letter
   * @returns the resulting plaintext
   * @throws RangeError if the ciphertext contains invalid characters.
   */
  private decrypt(ciphertext: string): string {
    const plaintext: string[] = [];
    for (const c of ciphertext) {
      // Process a garbled letter.
      if (c === "-") {
        plaintext.push(c);
        this.step();
        continue;
      }
      if (!Purple.validLetter.test(c)) {
        throw new RangeError(`Invalid character in ciphertext: ${c}`);
      }
      const n = this.alphabet.indexOf(c);
      let x: number;
      if (n < 6) {
        // This input goes to the sixes switch.
        x = this.sixes.decrypt(n);
      } else {
        // This input goes through the sequence of twenties switches in reverse
        // order compared to the encrypt path.
        const i = n - 6;
        x =
          this.twenties[0]!.decrypt(
            this.twenties[1]!.decrypt(this.twenties[2]!.decrypt(i)),
          ) + 6;
      }
      plaintext.push(this.alphabet[x]!);
      this.step();
    }
    return plaintext.join("");
  }

  /**
   * Step the switches according to the machine's crazy algorithm.
   */
  private step(): void {
    // First read the sixes and middle switch positions before stepping anything.
    const sixes = this.sixes.getPos();
    const middle = this.middleSwitch.getPos();

    // Now step the switches.
    // The sixes switch always steps after every letter processed.
    this.sixes.step();

    // Only 1 twenties switch steps at a time.
    // Normally the fast switch steps after every letter.
    // However, if the sixes switch was at the last position, the middle switch steps instead.
    // But, if the sixes switch was in the second to last position, and the middle switch
    // is in the last position, then the slow switch steps instead.
    if (sixes === 23 && middle === 24) {
      this.slowSwitch.step();
    } else if (sixes === 24) {
      this.middleSwitch.step();
    } else {
      this.fastSwitch.step();
    }
  }
}
