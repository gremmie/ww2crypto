import { describe, expect, test } from "vitest";
import {
  isValidHumanPlugboardStr,
  isValidPlugboardStr,
} from "../../../src/features/purple/utils.ts";

const IDENTITY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PERMUTED = "NOKTYUXEQLHBRMPDICJASVWGZF";

describe("isValidHumanPlugboardStr", () => {
  test("accepts a full 26-letter permutation", () => {
    expect(isValidHumanPlugboardStr(IDENTITY)).toBe(true);
    expect(isValidHumanPlugboardStr(PERMUTED)).toBe(true);
  });

  test("accepts lowercase letters", () => {
    expect(isValidHumanPlugboardStr(IDENTITY.toLowerCase())).toBe(true);
    expect(isValidHumanPlugboardStr(PERMUTED.toLowerCase())).toBe(true);
  });

  test("accepts embedded spaces", () => {
    expect(isValidHumanPlugboardStr("ABCDE FGHIJ KLMNO PQRST UVWXY Z")).toBe(
      true,
    );
  });

  test("accepts a mix of lowercase and spaces", () => {
    expect(isValidHumanPlugboardStr("nokty uxeql hbrmp dicja svwgz f")).toBe(
      true,
    );
  });

  test("rejects the empty string", () => {
    expect(isValidHumanPlugboardStr("")).toBe(false);
  });

  test("rejects strings that are too short or too long", () => {
    expect(isValidHumanPlugboardStr("ABC")).toBe(false);
    expect(isValidHumanPlugboardStr(IDENTITY + "A")).toBe(false);
  });

  test("rejects non-letter characters", () => {
    expect(isValidHumanPlugboardStr("ABCDEFGHIJKLMNOPQRSTUVWXY1")).toBe(false);
  });

  test("rejects 26 characters that are not all unique", () => {
    // Duplicated A, missing Z.
    expect(isValidHumanPlugboardStr("AABCDEFGHIJKLMNOPQRSTUVWXY")).toBe(false);
  });
});

describe("isValidPlugboardStr", () => {
  test("accepts a full 26-letter uppercase permutation", () => {
    expect(isValidPlugboardStr(IDENTITY)).toBe(true);
    expect(isValidPlugboardStr(PERMUTED)).toBe(true);
  });

  test("rejects lowercase letters", () => {
    expect(isValidPlugboardStr(IDENTITY.toLowerCase())).toBe(false);
    expect(isValidPlugboardStr(PERMUTED.toLowerCase())).toBe(false);
  });

  test("rejects embedded spaces", () => {
    expect(isValidPlugboardStr("ABCDE FGHIJ KLMNO PQRST UVWXY Z")).toBe(false);
  });

  test("rejects the empty string", () => {
    expect(isValidPlugboardStr("")).toBe(false);
  });

  test("rejects strings that are too short or too long", () => {
    expect(isValidPlugboardStr("ABC")).toBe(false);
    expect(isValidPlugboardStr(IDENTITY + "A")).toBe(false);
  });

  test("rejects non-letter characters", () => {
    expect(isValidPlugboardStr("ABCDEFGHIJKLMNOPQRSTUVWXY1")).toBe(false);
  });

  test("rejects 26 characters that are not all unique", () => {
    // Duplicated A, missing Z.
    expect(isValidPlugboardStr("AABCDEFGHIJKLMNOPQRSTUVWXY")).toBe(false);
  });
});
