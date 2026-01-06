import { describe, expect, test } from "vitest";
import {
  groupText,
  isValidNumericPlugboardString,
  isValidPlugboardString,
  isValidRotorWiring,
  modulo,
  normalizePlugboardString,
  toAlphaPlugboardString,
  toNumericConnection,
  toNumericPlug,
  toNumericPlugboardString,
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
    expect(toNumericConnection("BY")).toEqual("2/25");
  });

  test("JQ case", () => {
    expect(toNumericConnection("JQ")).toEqual("10/17");
  });

  test("QJ case", () => {
    expect(toNumericConnection("QJ")).toEqual("17/10");
  });
});

describe("isValidPlugboardString", () => {
  test("no cable case", () => {
    expect(isValidPlugboardString("", 0)).toEqual(true);
    expect(isValidPlugboardString("1/2", 0)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 0)).toEqual(false);
  });

  test("one cable case", () => {
    expect(isValidPlugboardString("", 1)).toEqual(false);
    expect(isValidPlugboardString("1/2", 1)).toEqual(false);
    expect(isValidPlugboardString("AB", 1)).toEqual(true);
    expect(isValidPlugboardString("AA", 1)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 1)).toEqual(false);
  });

  test("two cable case", () => {
    expect(isValidPlugboardString("", 2)).toEqual(false);
    expect(isValidPlugboardString("1/2", 2)).toEqual(false);
    expect(isValidPlugboardString("AB", 2)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 2)).toEqual(true);
    expect(isValidPlugboardString("YZ HB", 2)).toEqual(true);
    expect(isValidPlugboardString("YZ YZ", 2)).toEqual(false);
  });

  test("ten cable case", () => {
    expect(isValidPlugboardString("", 10)).toEqual(false);
    expect(isValidPlugboardString("1/2", 10)).toEqual(false);
    expect(isValidPlugboardString("AB", 10)).toEqual(false);
    expect(isValidPlugboardString("AB CD", 10)).toEqual(false);
    expect(isValidPlugboardString("YZ HB", 10)).toEqual(false);
    expect(isValidPlugboardString("AB CD EF GH IJ KL MN OP QR ST", 10)).toEqual(
      true,
    );
    expect(
      isValidPlugboardString(
        "1/2 3/4 5/6 7/8 9/10 11/12 13/14 15/16 17/18 19/20",
        10,
      ),
    ).toEqual(false);
    expect(isValidPlugboardString("AB CD GF GH IJ KL MN OP QR ST", 10)).toEqual(
      false,
    );
  });

  test("thirteen cable case", () => {
    expect(isValidPlugboardString("", 13)).toEqual(false);
    expect(isValidPlugboardString("1/2", 13)).toEqual(false);
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
        "1/2 3/4 5/6 7/8 9/10 11/12 13/14 15/16 17/18 19/20 21/22 23/24 25/26",
        13,
      ),
    ).toEqual(false);
  });
});

describe("isValidNumericPlugboardString", () => {
  test("no cable case", () => {
    expect(isValidNumericPlugboardString("", 0)).toEqual(true);
    expect(isValidNumericPlugboardString("AB", 0)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2", 0)).toEqual(false);
  });

  test("one cable case", () => {
    expect(isValidNumericPlugboardString("", 1)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 1)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2", 1)).toEqual(true);
    expect(isValidNumericPlugboardString("5/2", 1)).toEqual(true);
    expect(isValidNumericPlugboardString("1/2 7/20", 1)).toEqual(false);
    expect(isValidNumericPlugboardString("5/5", 1)).toEqual(false);
  });

  test("two cable case", () => {
    expect(isValidNumericPlugboardString("", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("5/2", 2)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2 7/20", 2)).toEqual(true);
    expect(isValidNumericPlugboardString("21/2 7/20", 2)).toEqual(true);
    expect(isValidNumericPlugboardString("21/2 7/2", 2)).toEqual(false);
  });

  test("ten cable case", () => {
    expect(isValidNumericPlugboardString("", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("5/2", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2 7/20", 10)).toEqual(false);
    expect(isValidNumericPlugboardString("21/2 7/20", 10)).toEqual(false);
    expect(
      isValidNumericPlugboardString(
        "1/2 3/4 5/6 7/8 9/10 11/12 13/14 15/16 17/18 19/20",
        10,
      ),
    ).toEqual(true);
    expect(
      isValidNumericPlugboardString(
        "1/2 3/4 5/6 7/8 9/10 11/12 13/5 15/16 17/18 19/20",
        10,
      ),
    ).toEqual(false);
  });

  test("thirteen cable case", () => {
    expect(isValidNumericPlugboardString("", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("AB", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("5/2", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("1/2 7/20", 13)).toEqual(false);
    expect(isValidNumericPlugboardString("21/2 7/20", 13)).toEqual(false);
    expect(
      isValidNumericPlugboardString(
        "1/2 3/4 5/6 7/8 9/10 11/12 13/14 15/16 17/18 19/20 21/22 23/24 25/26",
        13,
      ),
    ).toEqual(true);
    expect(
      isValidNumericPlugboardString(
        "1/2 3/4 5/6 7/8 9/10 11/12 13/14 15/16 17/8 19/20 21/22 3/24 25/26",
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

describe("toNumericPlugboardString", () => {
  test("no cable case", () => {
    expect(toNumericPlugboardString("")).toEqual("");
  });

  test("base cases", () => {
    expect(toNumericPlugboardString("AB")).toEqual("1/2");
    expect(toNumericPlugboardString("AB YZ")).toEqual("1/2 25/26");
    expect(toNumericPlugboardString("AV BS CG DL FU HZ IN KM OW RX")).toEqual(
      "1/22 2/19 3/7 4/12 6/21 8/26 9/14 11/13 15/23 18/24",
    );
  });
});

describe("toAlphaPlugboardString", () => {
  test("no cable case", () => {
    expect(toAlphaPlugboardString("")).toEqual("");
  });

  test("base cases", () => {
    expect(toAlphaPlugboardString("1/2")).toEqual("AB");
    expect(toAlphaPlugboardString("1/2 25/26")).toEqual("AB YZ");
    expect(
      toAlphaPlugboardString(
        "1/22 2/19 3/7 4/12 6/21 8/26 9/14 11/13 15/23 18/24",
      ),
    ).toEqual("AV BS CG DL FU HZ IN KM OW RX");
  });
});

describe("isValidRotorWiring", () => {
  test("invalid cases", () => {
    expect(isValidRotorWiring("")).toBe(false);
    expect(isValidRotorWiring("ab")).toBe(false);
    expect(isValidRotorWiring("abcdefghijklmnopqrstuvwxyz")).toBe(false);
    expect(isValidRotorWiring("123")).toBe(false);
    expect(isValidRotorWiring("01234567890123456789123456")).toBe(false);
    expect(isValidRotorWiring("ABCDEFGHIJKLMNOPQRSTUVWXYZG")).toBe(false);
    expect(isValidRotorWiring("-!ABCDEFGHIJKLMNOPQRSTUVWXYZ<>")).toBe(false);
  });

  test("valid cases", () => {
    expect(isValidRotorWiring("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe(true);
    expect(isValidRotorWiring("FKQHTLXOCBJSPDZRAMEWNIUYGV")).toBe(true);
  });
});

describe("modulo", () => {
  test("both dividend and divisor are positive", () => {
    expect(modulo(5, 1)).toEqual(0);
    expect(modulo(5, 7)).toEqual(5);
    expect(modulo(6, 7)).toEqual(6);
    expect(modulo(7, 7)).toEqual(0);
    expect(modulo(1, 7)).toEqual(1);
  });

  test("dividend is negative, divisor is positive", () => {
    expect(modulo(-5, 1)).toEqual(0);
    expect(modulo(-5, 7)).toEqual(2);
    expect(modulo(-6, 7)).toEqual(1);
    expect(modulo(-7, 7)).toEqual(0);
    expect(modulo(-1, 7)).toEqual(6);
  });
});

describe("groupText", () => {
  test("empty string", () => {
    expect(groupText("")).toEqual("");
  });

  test("text length smaller than group size", () => {
    expect(groupText("ABC")).toEqual("ABC");
  });

  test("text length equal to group size", () => {
    expect(groupText("ABCDE")).toEqual("ABCDE");
  });

  test("text length greater than group size", () => {
    expect(groupText("ABCDEFG")).toEqual("ABCDE FG");
  });
});
