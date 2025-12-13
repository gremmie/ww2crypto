import { describe, expect, test } from "vitest";
import {
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
});
