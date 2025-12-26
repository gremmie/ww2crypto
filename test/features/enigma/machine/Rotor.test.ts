import { describe, expect, test } from "vitest";
import Rotor, {
  RotorError,
} from "../../../../src/features/enigma/machine/Rotor.ts";
import { aCode, modulo } from "../../../../src/features/enigma/utils.ts";
import { rotateString } from "../../../utils/test-utils.tsx";

describe("Rotor tests", () => {
  const wiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
  const alphaLabels = Array.from({ length: 26 })
    .map((_, i) => String.fromCharCode(aCode + i))
    .join("");

  test("Invalid wiring", () => {
    expect(() => new Rotor("I", "")).toThrowError(RotorError);
    expect(() => new Rotor("I", "ABC")).toThrowError(RotorError);
    expect(() => new Rotor("I", "123")).toThrowError(RotorError);

    const s = "ABCD".repeat(7);
    expect(() => new Rotor("I", s)).toThrowError(RotorError);
    expect(() => new Rotor("I", s.slice(0, 26))).toThrowError(RotorError);
  });

  test("Invalid ring setting", () => {
    expect(() => new Rotor("I", wiring, -1)).toThrowError(RotorError);
    expect(() => new Rotor("I", wiring, 26)).toThrowError(RotorError);
  });

  test("Invalid stepping", () => {
    expect(() => new Rotor("I", wiring, 0, ["1"])).toThrowError(RotorError);
    expect(() => new Rotor("I", wiring, 26, [""])).toThrowError(RotorError);
    expect(() => new Rotor("I", wiring, 26, ["A", "%", "14"])).toThrowError(
      RotorError,
    );
  });

  test("Get and set display", () => {
    for (let i = 0; i < 26; ++i) {
      const rotor = new Rotor("I", wiring, i);
      for (const c of alphaLabels) {
        rotor.setDisplay(c);
        expect(rotor.getDisplay()).toEqual(c);
      }
    }
  });

  test("isNotchOverPawl for non-rotating rotor", () => {
    const rotor = new Rotor("I", wiring, 0);
    for (const c of alphaLabels) {
      rotor.setDisplay(c);
      expect(rotor.isNotchOverPawl()).toBe(false);
    }
  });

  test("isNotchOverPawl for rotating rotor", () => {
    const stepping = ["M", "Q"];
    for (let r = 0; r < 26; ++r) {
      const rotor = new Rotor("I", wiring, r, stepping);
      for (const c of alphaLabels) {
        rotor.setDisplay(c);
        expect(rotor.isNotchOverPawl()).toBe(stepping.includes(c));
      }
    }
  });

  test("Rotor rotation", () => {
    for (let r = 0; r < 26; ++r) {
      const rotor1 = new Rotor("X", wiring, r);
      const rotor2 = new Rotor("Y", wiring, r);

      rotor2.setDisplay("A");
      for (const c of alphaLabels) {
        rotor1.setDisplay(c);
        expect(rotor1.getDisplay()).toEqual(rotor2.getDisplay());
        rotor2.rotate();
      }
    }
  });

  test("Wiring and ring settings", () => {
    // Loop through all the ring settings and rotor positions and test the wiring.
    for (let r = 0; r < 26; ++r) {
      const rotor = new Rotor("X", wiring, r);
      for (const [n, d] of alphaLabels.split("").entries()) {
        rotor.setDisplay(d);
        const newWiring = rotateString(wiring, n - r);
        for (let i = 0; i < 26; ++i) {
          const contact = rotor.signalIn(i);
          const expected = modulo(
            newWiring[i].charCodeAt(0) - aCode + r - n,
            26,
          );
          expect(contact).toEqual(expected);
        }
      }
    }
  });
});
