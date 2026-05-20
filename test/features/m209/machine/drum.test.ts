import { describe, expect, test } from "vitest";
import Drum from "../../../../src/features/m209/machine/drum.ts";
import { parseDrumLugStr } from "../../../../src/features/m209/utils.ts";

describe("Drum", () => {
  test("constructor throws when given too many bars", () => {
    const bars: [number, number][] = Array.from({ length: 28 }, () => [0, 0]);
    expect(() => new Drum(bars)).toThrow(RangeError);
  });

  test("can be constructed with empty array of lugs", () => {
    const bars: [number, number][] = [];
    const drum = new Drum(bars);
    const count = drum.rotate([true, true, true, true, true, true]);
    expect(count).toBe(0);
  });

  test("rotate throws when given empty pins array", () => {
    const bars: [number, number][] = [];
    const drum = new Drum(bars);
    expect(() => drum.rotate([])).toThrow(RangeError);
  });

  test("rotate throws when given too small of a pins array", () => {
    const bars: [number, number][] = [];
    const drum = new Drum(bars);
    expect(() => drum.rotate([false])).toThrow(RangeError);
  });

  test("rotate throws when given too large of a pins array", () => {
    const bars: [number, number][] = [];
    const drum = new Drum(bars);
    const pins = Array.from({ length: 7 }, () => true);
    expect(() => drum.rotate(pins)).toThrow(RangeError);
  });

  test("rotate when no effective pins", () => {
    const bars: [number, number][] = Array.from({ length: 27 }, () => [1, 6]);
    const drum = new Drum(bars);
    const pins = [false, true, true, true, true, false];
    expect(drum.rotate(pins)).toBe(0);
  });

  test("rotate with effective pins", () => {
    const bars: [number, number][] = Array.from({ length: 27 }, () => [1, 6]);
    const drum = new Drum(bars);
    const pins = [true, true, true, true, false, true];
    expect(drum.rotate(pins)).toBe(27);
  });

  const testRotate = (pins: boolean[]) => {
    const parseResult = parseDrumLugStr(
      "0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6",
    );
    expect(parseResult.isValid).toBe(true);
    if (!parseResult.isValid) {
      expect.fail("Invalid drum lug string");
    }
    const bars = parseResult.drumState;
    const drum = new Drum(bars);

    let expected = 0;
    for (const lugPair of bars) {
      const leftLug = lugPair[0];
      const rightLug = lugPair[1];
      for (const [n, pin] of pins.entries()) {
        if (
          pin &&
          ((leftLug !== 0 && leftLug - 1 === n) ||
            (rightLug !== 0 && rightLug - 1 === n))
        ) {
          ++expected;
          break;
        }
      }
    }

    expect(expected).toBeGreaterThanOrEqual(0);
    expect(expected).toBeLessThanOrEqual(27);
    expect(drum.rotate(pins)).toBe(expected);
  };

  test("rotate produces expected count", () => {
    testRotate([true, true, true, false, true, false]);
    testRotate([true, false, true, false, true, false]);
    testRotate([false, false, true, false, true, false]);
    testRotate([false, false, true, true, false, false]);
    testRotate([false, false, false, false, false, false]);
    testRotate([true, true, true, true, true, true]);
  });
});
