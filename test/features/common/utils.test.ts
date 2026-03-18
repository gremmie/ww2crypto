import { describe, expect, test } from "vitest";
import { modulo } from "../../../src/features/common/utils.ts";

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
