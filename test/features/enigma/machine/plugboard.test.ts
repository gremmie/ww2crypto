import { describe, expect, test } from "vitest";
import Plugboard, {
  PlugboardError,
} from "../../../../src/features/enigma/machine/plugboard.ts";

describe("Plugboard", () => {
  test("Bad constructor input", () => {
    expect(() => new Plugboard("123")).toThrow(PlugboardError);
    expect(() => new Plugboard("ABCD")).toThrow(PlugboardError);
    expect(
      () => new Plugboard("AB CD EF GH IJ KL MN OP QR ST UV WX YZ EH"),
    ).toThrow(PlugboardError);
    expect(() => new Plugboard("AB CD AB")).toThrow(PlugboardError);
    expect(() => new Plugboard("A/B CX")).toThrow(PlugboardError);
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
