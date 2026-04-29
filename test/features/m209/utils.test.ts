import { describe, expect, test } from "vitest";
import { KEY_WHEEL_DATA } from "../../../src/features/m209/machine/wheelData.ts";
import {
  drumLugStateToStr,
  isValidWheelPins,
  parseDrumLugStr,
  sortDrumState,
} from "../../../src/features/m209/utils.ts";

type LugSettings = [left: number, right: number, repeat?: number];

describe("parseDrumLugStr", () => {
  test("empty string", () => {
    expect(parseDrumLugStr("").isValid).toBe(false);
  });

  test("garbage strings", () => {
    expect(parseDrumLugStr("asjkdla;").isValid).toBe(false);
    expect(parseDrumLugStr(" 4830 4uils").isValid).toBe(false);
  });

  test("invalid lug numbers", () => {
    expect(parseDrumLugStr("9-3").isValid).toBe(false);
    expect(parseDrumLugStr("3-9").isValid).toBe(false);
    expect(parseDrumLugStr("4-3").isValid).toBe(false);
    expect(parseDrumLugStr("-1-3").isValid).toBe(false);
    expect(parseDrumLugStr("1--3").isValid).toBe(false);
    expect(parseDrumLugStr("5-3").isValid).toBe(false);
    expect(parseDrumLugStr("5-5").isValid).toBe(false);
  });

  const generateExpected = (settings: LugSettings[]) => {
    const totalEntries = settings.reduce(
      (accum, current) => accum + (current[2] ?? 1),
      0,
    );
    if (totalEntries > 27) throw new Error("Too many settings values");
    const result = new Array<[number, number]>(0);
    for (const entry of settings) {
      const repeatCount = entry[2] ?? 1;
      for (let n = 0; n < repeatCount; ++n) {
        result.push([entry[0], entry[1]]);
      }
    }
    const leftOver = 27 - totalEntries;
    for (let n = 0; n < leftOver; ++n) {
      result.push([0, 0]);
    }
    return result;
  };

  test("valid case 0", () => {
    const result = parseDrumLugStr("3-0 4-5 5-6");
    expect(result.isValid).toBe(true);
    const expected = generateExpected([
      [3, 0],
      [4, 5],
      [5, 6],
    ]);

    if (result.isValid) {
      expect(result.drumState).toEqual(expected);
    }
  });

  test("valid case 1", () => {
    const result = parseDrumLugStr("0-4*4 0-5 0-6 1-0*5 1-5*2 2-0*12 3-0*2");
    expect(result.isValid).toBe(true);
    const expected = generateExpected([
      [0, 4, 4],
      [0, 5],
      [0, 6],
      [1, 0, 5],
      [1, 5, 2],
      [2, 0, 12],
      [3, 0, 2],
    ]);

    if (result.isValid) {
      expect(result.drumState).toEqual(expected);
    }
  });

  test("valid case 2", () => {
    const result = parseDrumLugStr(
      "0-4*2 0-5*9 1-0 1-2 2-0*4 2-3 2-4*2 2-5 2-6 3-0*2 3-4 4-5*2",
    );
    expect(result.isValid).toBe(true);
    const expected = generateExpected([
      [0, 4, 2],
      [0, 5, 9],
      [1, 0],
      [1, 2],
      [2, 0, 4],
      [2, 3],
      [2, 4, 2],
      [2, 5],
      [2, 6],
      [3, 0, 2],
      [3, 4],
      [4, 5, 2],
    ]);

    if (result.isValid) {
      expect(result.drumState).toEqual(expected);
    }
  });

  test("valid case 3", () => {
    const result = parseDrumLugStr("0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6");
    expect(result.isValid).toBe(true);
    const expected = generateExpected([
      [0, 5, 8],
      [1, 0, 4],
      [1, 3],
      [2, 4, 2],
      [3, 0, 8],
      [3, 4],
      [3, 5, 2],
      [4, 6],
    ]);

    if (result.isValid) {
      expect(result.drumState).toEqual(expected);
    }
  });

  test("too many pairs", () => {
    expect(
      parseDrumLugStr("0-4*4 0-5 0-6 1-0*5 1-5*2 0-0 2-0*12 3-0*2").isValid,
    ).toBe(false);
    expect(
      parseDrumLugStr(
        "0-4*2 0-5*9 1-0 1-2 2-0*4 2-3 2-4*2 2-5 2-6 3-0*2 3-4 4-5*3",
      ).isValid,
    ).toBe(false);
    expect(
      parseDrumLugStr("0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6 1-0 2-0")
        .isValid,
    ).toBe(false);
  });
});

describe("parseDrumLugStr", () => {
  test("all zero", () => {
    const result = parseDrumLugStr("0-0*27");
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(drumLugStateToStr(result.drumState)).toBe("");
    }
  });

  test("empty settings", () => {
    expect(drumLugStateToStr([])).toBe("");
  });

  test("simple test case", () => {
    expect(
      drumLugStateToStr([
        [1, 2],
        [2, 3],
        [2, 3],
        [1, 2],
        [4, 6],
      ]),
    ).toBe("1-2 2-3*2 1-2 4-6");
  });

  test("realistic case 1", () => {
    const settings = "0-4 0-5*4 1-0*8 1-3*4 1-6 2-0*2 3-0*4 5-6*3";
    const result = parseDrumLugStr(settings);
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(drumLugStateToStr(result.drumState)).toBe(settings);
    }
  });

  test("realistic case 2", () => {
    const settings = "0-5 0-6*10 1-0*2 1-4 2-0*3 2-3*2 2-4 3-0*6 3-6";
    const result = parseDrumLugStr(settings);
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(drumLugStateToStr(result.drumState)).toBe(settings);
    }
  });

  test("realistic case 3", () => {
    const settings = "0-4*2 1-0*11 2-0*8 2-5 3-0*4 5-6";
    const result = parseDrumLugStr(settings);
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(drumLugStateToStr(result.drumState)).toBe(settings);
    }
  });
});

describe("sortDrumState", () => {
  test("no changes", () => {
    const result = parseDrumLugStr("0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6");
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      const sorted = sortDrumState(result.drumState);
      expect(sorted).toEqual(result.drumState);
    }
  });

  test("sort case 1", () => {
    const result = parseDrumLugStr("4-6 1-0*4 0-5*8 0-0 3-4 3-5*2 2-4*2 3-0*8");
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      const sorted = sortDrumState(result.drumState);
      const expected = parseDrumLugStr(
        "0-5*8 1-0*4 2-4*2 3-0*8 3-4 3-5*2 4-6 0-0",
      );
      expect(expected.isValid).toBe(true);
      if (expected.isValid) {
        expect(sorted).toEqual(expected.drumState);
      }
    }
  });

  const testShuffle = (settings: string) => {
    const result = parseDrumLugStr(settings);
    expect(result.isValid).toBe(true);
    if (!result.isValid) return;
    const shuffled = result.drumState
      .map((pair) => ({
        pair,
        sort: Math.random(),
      }))
      .toSorted((a, b) => a.sort - b.sort)
      .map(({ pair }) => pair);
    const sorted = sortDrumState(shuffled);
    expect(sorted).toEqual(result.drumState);
  };

  test("shuffle case 1", () => {
    testShuffle("0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6");
  });

  test("shuffle case 2", () => {
    testShuffle("0-4*7 0-5*2 0-6*8 1-0 2-4 2-5*2 2-6 3-4 3-5 4-6*2 5-6");
  });

  test("all zeros get put to the end", () => {
    testShuffle("1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6 0-0*8");
  });
});

describe("isValidWheelPins", () => {
  test("invalid wheel number", () => {
    expect(isValidWheelPins(-1, "ABC")).toBe(false);
    expect(isValidWheelPins(6, "ABC")).toBe(false);
  });

  test("invalid pins", () => {
    expect(isValidWheelPins(1, "ABC ")).toBe(false);
    expect(isValidWheelPins(2, "AB3C")).toBe(false);
    expect(isValidWheelPins(2, "0ABC")).toBe(false);
    expect(isValidWheelPins(2, "ABC!")).toBe(false);
  });

  test("trivial valid cases", () => {
    for (let i = 0; i < 6; ++i) {
      expect(isValidWheelPins(i, "ABC")).toBe(true);
    }
  });

  test("trivial valid lower cases", () => {
    for (let i = 0; i < 6; ++i) {
      expect(isValidWheelPins(i, "abc")).toBe(true);
    }
  });

  test("duplicates are ok", () => {
    const wheelData = KEY_WHEEL_DATA[3];
    expect(wheelData).toBeDefined();
    if (wheelData) {
      const letters = wheelData.letters;
      expect(isValidWheelPins(3, letters + letters)).toBe(true);
    }
  });

  for (let n = 0; n < 6; ++n) {
    test(`test wheel ${n + 1}`, () => {
      const wheelData = KEY_WHEEL_DATA[n];
      expect(wheelData).toBeDefined();
      if (wheelData) {
        expect(isValidWheelPins(n, wheelData.letters)).toBe(true);
      }
    });
  }

  test("shuffled is ok", () => {
    const wheelData = KEY_WHEEL_DATA[3];
    expect(wheelData).toBeDefined();
    if (wheelData) {
      const shuffled = Array.from(wheelData.letters)
        .map((pin) => ({
          pin,
          sort: Math.random(),
        }))
        .toSorted((a, b) => a.sort - b.sort)
        .map(({ pin }) => pin)
        .join("");
      expect(isValidWheelPins(3, shuffled)).toBe(true);
    }
  });
});
