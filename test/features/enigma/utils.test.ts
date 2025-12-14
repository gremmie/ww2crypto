import { describe, expect, test } from "vitest";
import {
  isValidNumericPlugboardString,
  isValidPlugboardString,
  normalizePlugboardString,
  toNumericConnection,
  toNumericPlug,
} from "../../../src/features/enigma/utils";

describe("toNumericPlug", () => {
  test("A case", () => {
    expect(toNumericPlug("A")).toEqual(1);
  });

  test("M case", () => {
    expect(toNumericPlug("M")).toEqual(13);
  });

  test("Z case", () => {
    expect(toNumericPlug("Z")).toEqual(26);
  });
});

describe("toNumericConnection", () => {
  test("BY case", () => {
    expect(toNumericConnection("BY")).toEqual("2-25");
  });

  test("JQ case", () => {
    expect(toNumericConnection("JQ")).toEqual("10-17");
  });

  test("QJ case", () => {
    expect(toNumericConnection("QJ")).toEqual("17-10");
  });
});

describe("isValidPlugboardString", () => {
  test("no cable case", () => {
    expect(isValidPlugboardString("", 0)).toEqual(true);
    expect(isValidPlugboardString("1-2", 0)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 0)).toEqual(false);
  });

  test("one cable case", () => {
    expect(isValidPlugboardString("", 1)).toEqual(false);
    expect(isValidPlugboardString("1-2", 1)).toEqual(false);
    expect(isValidPlugboardString("AB", 1)).toEqual(true);
    expect(isValidPlugboardString("AA", 1)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 1)).toEqual(false);
  });

  test("two cable case", () => {
    expect(isValidPlugboardString("", 2)).toEqual(false);
    expect(isValidPlugboardString("1-2", 2)).toEqual(false);
    expect(isValidPlugboardString("AB", 2)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 2)).toEqual(true);
    expect(isValidPlugboardString("YZ HB", 2)).toEqual(true);
    expect(isValidPlugboardString("YZ YZ", 2)).toEqual(false);
  });

  test("ten cable case", () => {
    expect(isValidPlugboardString("", 10)).toEqual(false);
    expect(isValidPlugboardString("1-2", 10)).toEqual(false);
    expect(isValidPlugboardString("AB", 10)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 10)).toEqual(false);
    expect(isValidPlugboardString("YZ HB", 10)).toEqual(false);
    expect(isValidPlugboardString("AB CD EF GH IJ KL MN OP QR ST", 10)).toEqual(
      true,
    );
    expect(
      isValidPlugboardString(
        "1-2 3-4 5-6 7-8 9-10 11-12 13-14 15-16 17-18 19-20",
        10,
      ),
    ).toEqual(false);
    expect(isValidPlugboardString("AB CD GF GH IJ KL MN OP QR ST", 10)).toEqual(
      false,
    );
  });

  test("thirteen cable case", () => {
    expect(isValidPlugboardString("", 13)).toEqual(false);
    expect(isValidPlugboardString("1-2", 13)).toEqual(false);
    expect(isValidPlugboardString("AB", 13)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 13)).toEqual(false);
    expect(isValidPlugboardString("YZ HB", 13)).toEqual(false);
    expect(isValidPlugboardString("AB CD EF GH IJ KL MN OP QR ST", 13)).toEqual(
      false,
    );
    expect(
      isValidPlugboardString("AB CD EF GH IJ KL MN OP QR ST UV WX YZ", 13),
    ).toEqual(true);
    expect(
      isValidPlugboardString("AB CD EF GH IJ KL MN OP QR ST UV WX ZZ", 13),
    ).toEqual(false);
    expect(
      isValidPlugboardString(
        "1-2 3-4 5-6 7-8 9-10 11-12 13-14 15-16 17-18 19-20 21-22 23-24 25-26",
        13,
      ),
    ).toEqual(false);
  });
});

describe("isValidNumericPlugboardString", () => {
  test("no cable case", () => {
    expect(isValidNumericPlugboardString("", 0)).toEqual(true);
    expect(isValidNumericPlugboardString("AB", 0)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2", 0)).toEqual(false);
  });

  test("one cable case", () => {
    expect(isValidNumericPlugboardString("", 1)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 1)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2", 1)).toEqual(true);
    expect(isValidNumericPlugboardString("5-2", 1)).toEqual(true);
    expect(isValidNumericPlugboardString("1-2 7-20", 1)).toEqual(false);
    expect(isValidNumericPlugboardString("5-5", 1)).toEqual(false);
  });

  test("two cable case", () => {
    expect(isValidNumericPlugboardString("", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("5-2", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2 7-20", 2)).toEqual(true);
    expect(isValidNumericPlugboardString("21-2 7-20", 2)).toEqual(true);
    expect(isValidNumericPlugboardString("21-2 7-2", 2)).toEqual(false);
  });

  test("ten cable case", () => {
    expect(isValidNumericPlugboardString("", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("5-2", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2 7-20", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("21-2 7-20", 10)).toEqual(false);
    expect(
      isValidNumericPlugboardString(
        "1-2 3-4 5-6 7-8 9-10 11-12 13-14 15-16 17-18 19-20",
        10,
      ),
    ).toEqual(true);
    expect(
      isValidNumericPlugboardString(
        "1-2 3-4 5-6 7-8 9-10 11-12 13-5 15-16 17-18 19-20",
        10,
      ),
    ).toEqual(false);
  });

  test("thirteen cable case", () => {
    expect(isValidNumericPlugboardString("", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("5-2", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("1-2 7-20", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("21-2 7-20", 13)).toEqual(false);
    expect(
      isValidNumericPlugboardString(
        "1-2 3-4 5-6 7-8 9-10 11-12 13-14 15-16 17-18 19-20 21-22 23-24 25-26",
        13,
      ),
    ).toEqual(true);
    expect(
      isValidNumericPlugboardString(
        "1-2 3-4 5-6 7-8 9-10 11-12 13-14 15-16 17-8 19-20 21-22 3-24 25-26",
        13,
      ),
    ).toEqual(false);
  });
});

describe("normalizePlugboardString", () => {
  test("no cable case", () => {
    expect(normalizePlugboardString("")).toEqual("");
  });

  test("should convert to upper case", () => {
    expect(normalizePlugboardString("ab cD zY")).toEqual("AB CD YZ");
  });

  test("should sort plugs", () => {
    expect(normalizePlugboardString("ba Dc Yz")).toEqual("AB CD YZ");
  });
});
