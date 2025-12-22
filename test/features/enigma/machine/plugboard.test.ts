import { describe, expect, test } from "vitest";
import {
  Plugboard,
  PlugboardError,
} from "../../../../src/features/enigma/machine/plugboard.ts";

describe("Plugboard", () => {
  test("Bad constructor input", () => {
    expect(() => new Plugboard("123")).toThrowError(PlugboardError);
    expect(() => new Plugboard("ABCD")).toThrowError(PlugboardError);
    expect(
      () => new Plugboard("AB CD EF GH IJ KL MN OP QR ST UV WX YZ EH"),
    ).toThrowError(PlugboardError);
    expect(() => new Plugboard("AB CD AB")).toThrowError(PlugboardError);
    expect(() => new Plugboard("A/B CX")).toThrowError(PlugboardError);
  });

  test("No connections", () => {
    const plugboard = new Plugboard("");
    for (let i = 0; i < 26; ++i) {
      expect(plugboard.signal(i)).toEqual(i);
    }
  });

  test("Neighbor wiring test", () => {
    const plugboard = new Plugboard("AB CD EF GH IJ KL MN OP QR ST UV WX YZ");

    for (let i = 0; i < 26; ++i) {
      expect(plugboard.signal(i)).toEqual(i + (i % 2 === 0 ? 1 : -1));
    }
  });
});
