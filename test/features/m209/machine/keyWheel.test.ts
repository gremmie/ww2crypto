import { describe, expect, test } from "vitest";
import KeyWheel, { KeyWheelError } from "../../../../src/features/m209/machine/keyWheel.ts";

describe("KeyWheel", () => {
  test("Constructor throws for invalid letters", () => {
    expect(() => new KeyWheel("", "")).toThrow(KeyWheelError);
    expect(() => new KeyWheel("ABCDEFGHIJKLMNOPQRSTUVWXYZ!", "A")).toThrow(
      KeyWheelError,
    );
  });

  test("Constructor throws for invalid guide letter", () => {
    expect(() => new KeyWheel("ABC", "D")).toThrow(KeyWheelError);
    expect(() => new KeyWheel("ABC", "")).toThrow(KeyWheelError);
  });

  test("Constructor builds object as expected - no effective pins", () => {
    const wheel = new KeyWheel("ABCDEF", "C");
    expect(wheel.letters).toBe("ABCDEF");
    expect(wheel.guideLetter).toBe("C");
    expect(wheel.numPins).toBe(6);
    expect(wheel.display()).toBe("A");
    expect(wheel.guideArmLetter()).toBe("C");
    expect(wheel.isEffective()).toBe(false);

    for (const letter of wheel.letters) {
      expect(wheel.display()).toBe(letter);
      expect(wheel.isEffective()).toBe(false);
      wheel.rotate();
    }
    expect(wheel.display()).toBe("A");
  });

  test("Constructor builds object as expected - effective pins", () => {
    const effectivePins = "ABCDEF";
    const wheel = new KeyWheel("ABCDEF", "C", effectivePins);

    for (const letter of wheel.letters) {
      expect(wheel.display()).toBe(letter);
      if (effectivePins.indexOf(wheel.guideArmLetter()) !== -1) {
        expect(wheel.isEffective()).toBe(true);
      } else {
        expect(wheel.isEffective()).toBe(false);
      }
      wheel.rotate();
    }
    expect(wheel.display()).toBe("A");
  });

  test("Pins can be reset", () => {
    const wheel = new KeyWheel("ABCDEF", "C", "BCE");
    wheel.resetPins();
    for (const letter of wheel.letters) {
      expect(wheel.display()).toBe(letter);
      expect(wheel.isEffective()).toBe(false);
      wheel.rotate();
    }
    expect(wheel.display()).toBe("A");
    expect(wheel.isEffective()).toBe(false);
  });
});
