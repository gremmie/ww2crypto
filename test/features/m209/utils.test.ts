import { describe, expect, test } from "vitest";
import { parseDrumLugStr } from "../../../src/features/m209/utils.ts";

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
