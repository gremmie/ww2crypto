import { modulo } from "../../common/utils.ts";

export class KeyWheelError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Simulates a key wheel in a M-209 converter.
 */
export class KeyWheel {
  readonly letters: string;
  readonly guideLetter: string;
  readonly numPins: number;

  /**
   * Map that holds the offset for each letter on the wheel.
   * Needed because some key wheel letters are not all contiguous.
   */
  private readonly offsetByLetter: Map<string, number>;
  private readonly guideOffset: number;

  /**
   * Rotational position. 0 means the first letter is shown to the operator.
   */
  private pos = 0;

  /**
   * The effective state of each pin on the wheel.
   */
  private readonly pins: boolean[];

  /**
   * Constructor for KeyWheel.
   *
   * @param letters {string} - The letters that appear on the key wheel face
   * @param guideLetter {string} - Must be a letter in `letters`. It indicates which letter affects the guide arm when
   * the first letter in letters is displayed to the operator.
   * @param effectivePins {string|null} - Indicates which letter pins are slid to the effective position. If null or
   * empty, then all pins are in their ineffective position.
   */
  constructor(letters: string, guideLetter: string, effectivePins?: string) {
    if (letters.length === 0 || letters.length > 26) {
      throw new KeyWheelError(`Invalid letters ${letters}`);
    }
    if (letters.indexOf(guideLetter) === -1) {
      throw new KeyWheelError(`Invalid guideLetter ${guideLetter}`);
    }
    this.letters = letters;
    this.guideLetter = guideLetter;
    this.numPins = letters.length;
    this.pins = Array.from({ length: this.numPins }, () => false);

    this.offsetByLetter = new Map(
      Array.from(letters, (letter, n) => [letter, n]),
    );
    const guideOffset = this.offsetByLetter.get(this.guideLetter);
    if (guideOffset === undefined) {
      throw new KeyWheelError("Invalid guideLetter");
    }
    this.guideOffset = guideOffset;

    if (effectivePins) {
      this.setPins(effectivePins);
    } else {
      this.resetPins();
    }
  }

  /**
   * Sets which pins are effective.
   * @param effectivePins {string} - A string of letters indicating which pins are effective.
   * Each letter must be in `this.letters`. Key wheel letters not appearing in this string are considered
   * to be ineffective.
   */
  setPins(effectivePins: string): void {
    this.resetPins();
    for (const pin of effectivePins) {
      const offset = this.offsetByLetter.get(pin);
      if (offset === undefined) {
        throw new KeyWheelError(`Invalid pin ${pin}`);
      }
      this.pins[offset] = true;
    }
  }

  /**
   * Resets all pins to the ineffective state.
   */
  resetPins(): void {
    this.pins.fill(false);
  }

  /**
   * Returns the current letter shown to the operator.
   */
  display(): string {
    const letter = this.letters[this.pos];
    if (letter === undefined) {
      throw new KeyWheelError("Internal error: key wheel in invalid position");
    }
    return letter;
  }

  /**
   * Sets the position of the key wheel such that the given letter is shown to
   * the operator.
   *
   * @param letter {string} - the letter to rotate the key wheel to
   */
  setLetter(letter: string): void {
    const pos = this.offsetByLetter.get(letter);
    if (pos === undefined) {
      throw new KeyWheelError(`Invalid letter ${letter}`);
    }
    this.pos = pos;
  }

  /**
   * Rotates the wheel the given number of steps.
   * @param steps {number|null} - The number of steps to rotate. If negative, indicates the key wheel should be rolled
   * backwards. If not supplied, the key wheel is rotated one step forward.
   */
  rotate(steps?: number): void {
    const n = steps ?? 1;
    this.pos = modulo(this.pos + n, this.numPins);
  }

  /**
   * Returns the letter of the pin that is position to effect the guide arm.
   */
  guideArmLetter(): string {
    const n = modulo(this.pos + this.guideOffset, this.numPins);
    const result = this.letters[n];
    if (result === undefined) {
      throw new KeyWheelError("Internal error: key wheel in invalid position");
    }
    return result;
  }

  /**
   * Returns true if the key wheel is currently causing the guide arm to be in the effective position.
   */
  isEffective(): boolean {
    const n = modulo(this.pos + this.guideOffset, this.numPins);
    const result = this.pins[n];
    if (result === undefined) {
      throw new KeyWheelError("Internal error: key wheel in invalid position");
    }
    return result;
  }
}
