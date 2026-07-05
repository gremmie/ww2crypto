import { describe, expect, test } from "vitest";
import { Switch } from "../../../../src/features/purple/machine/switch.ts";
import { SwitchType } from "../../../../src/features/purple/models/switchType.ts";
import {
  DECRYPT_DATA,
  ENCRYPT_DATA,
} from "../../../../src/features/purple/machine/data.ts";

describe("Switch", () => {
  // Small synthetic wiring so exact-value tests don't depend on the real
  // data tables. Two positions whose rows are inverse permutations of a
  // width-3 alphabet.
  const dec3 = [
    [2, 0, 1],
    [1, 2, 0],
  ];
  const enc3 = [
    [1, 2, 0], // inverse of [2, 0, 1]
    [2, 0, 1], // inverse of [1, 2, 0]
  ];

  describe("construction / setPos validation", () => {
    test("rejects an out-of-range initial position", () => {
      expect(() => new Switch(dec3, enc3, -1)).toThrow(RangeError);
      expect(() => new Switch(dec3, enc3, 2)).toThrow(RangeError);
    });

    test("accepts positions at both boundaries", () => {
      expect(() => new Switch(dec3, enc3, 0)).not.toThrow();
      expect(() => new Switch(dec3, enc3, 1)).not.toThrow();
    });

    test("setPos validates the same way after construction", () => {
      const s = new Switch(dec3, enc3, 0);
      expect(() => s.setPos(-1)).toThrow(RangeError);
      expect(() => s.setPos(2)).toThrow(RangeError);
      expect(() => s.setPos(1)).not.toThrow();
    });
  });

  describe("getPos", () => {
    test("returns the position set at construction", () => {
      expect(new Switch(dec3, enc3, 0).getPos()).toBe(0);
      expect(new Switch(dec3, enc3, 1).getPos()).toBe(1);
    });

    test("reflects a position set via setPos", () => {
      const s = new Switch(dec3, enc3, 0);
      s.setPos(1);
      expect(s.getPos()).toBe(1);
    });

    test("reflects stepping", () => {
      const s = new Switch(dec3, enc3, 0);
      s.step();
      expect(s.getPos()).toBe(1);
      s.step(); // wraps, numPositions === 2
      expect(s.getPos()).toBe(0);
    });
  });

  describe("step", () => {
    test("advances by one and returns the new position", () => {
      const s = new Switch(dec3, enc3, 0);
      expect(s.step()).toBe(1);
    });

    test("wraps around at numPositions", () => {
      const s = new Switch(dec3, enc3, 1); // last position of a 2-position switch
      expect(s.step()).toBe(0);
    });

    test("a full cycle of steps returns to the starting position", () => {
      const s = new Switch(dec3, enc3, 0);
      s.step();
      s.step(); // numPositions === 2
      expect(s.getPos()).toBe(0);
    });
  });

  describe("decrypt / encrypt lookups", () => {
    test("read the row for the current position", () => {
      const s = new Switch(dec3, enc3, 0);
      expect(s.decrypt(0)).toBe(2);
      expect(s.decrypt(1)).toBe(0);
      expect(s.decrypt(2)).toBe(1);
    });

    test("the mapping changes as the switch steps", () => {
      const s = new Switch(dec3, enc3, 0);
      expect(s.decrypt(0)).toBe(2);
      s.step();
      expect(s.decrypt(0)).toBe(1);
    });

    test("encrypt is the inverse of decrypt at a given position", () => {
      const s = new Switch(dec3, enc3, 0);
      for (let level = 0; level < 3; level++) {
        expect(s.decrypt(s.encrypt(level))).toBe(level);
        expect(s.encrypt(s.decrypt(level))).toBe(level);
      }
    });

    test("throws RangeError for an out-of-range level", () => {
      const s = new Switch(dec3, enc3, 0);
      expect(() => s.decrypt(-1)).toThrow(RangeError);
      expect(() => s.decrypt(3)).toThrow(RangeError);
      expect(() => s.encrypt(-1)).toThrow(RangeError);
      expect(() => s.encrypt(3)).toThrow(RangeError);
    });
  });

  describe("factory (real wiring data)", () => {
    // Width (number of levels) per switch type, derived from the data so
    // these tests self-adjust if the tables ever change.
    const widthOf = (type: SwitchType): number =>
      DECRYPT_DATA[type]![0]!.length;

    const allTypes = Object.values(SwitchType);

    test("builds a switch for every switch type", () => {
      for (const type of allTypes) {
        expect(() => Switch.factory(type, 0)).not.toThrow();
      }
    });

    test("passes the position through to validation", () => {
      const numPositions = DECRYPT_DATA[SwitchType.Sixes]!.length;
      expect(() => Switch.factory(SwitchType.Sixes, numPositions)).toThrow(
        RangeError,
      );
    });

    test("Sixes has width 6 and Twenties have width 20", () => {
      expect(widthOf(SwitchType.Sixes)).toBe(6);
      expect(widthOf(SwitchType.Twenties1)).toBe(20);
      expect(widthOf(SwitchType.Twenties2)).toBe(20);
      expect(widthOf(SwitchType.Twenties3)).toBe(20);
    });

    test("encrypt and decrypt are inverses at every position and level", () => {
      for (const type of allTypes) {
        const width = widthOf(type);
        const numPositions = DECRYPT_DATA[type]!.length;
        const s = Switch.factory(type, 0);
        for (let p = 0; p < numPositions; p++) {
          for (let level = 0; level < width; level++) {
            expect(s.decrypt(s.encrypt(level))).toBe(level);
            expect(s.encrypt(s.decrypt(level))).toBe(level);
          }
          s.step();
        }
      }
    });

    test("each row of every table is a permutation of its levels", () => {
      for (const type of allTypes) {
        const width = widthOf(type);
        const expected = Array.from({ length: width }, (_, i) => i);
        for (const table of [DECRYPT_DATA[type]!, ENCRYPT_DATA[type]!]) {
          for (const row of table) {
            expect([...row].sort((a, b) => a - b)).toEqual(expected);
          }
        }
      }
    });
  });
});
