import { beforeEach, describe, expect, test } from "vitest";
import { Drum } from "../../../../src/features/m209/machine/drum.ts";
import { KeyWheel, KeyWheelError } from "../../../../src/features/m209/machine/keyWheel.ts";
import { M209 } from "../../../../src/features/m209/machine/m209.ts";
import { KEY_WHEEL_DATA } from "../../../../src/features/m209/machine/wheelData.ts";
import { parseDrumLugStr } from "../../../../src/features/m209/utils.ts";

const buildM209 = (lugs?: string, pinList?: string[]) => {
  const keyWheels = Array.from(
    { length: 6 },
    (_, i) =>
      new KeyWheel(KEY_WHEEL_DATA[i]!.letters, KEY_WHEEL_DATA[i]!.guideLetter),
  );
  if (pinList) {
    for (const [n, pins] of pinList.entries()) {
      keyWheels[n]!.setPins(pins);
    }
  }

  let bars: [number, number][] = [];
  if (lugs) {
    const result = parseDrumLugStr(lugs);
    if (result.isValid) {
      bars = result.drumState;
    }
  }

  const drum = new Drum(bars);
  return new M209(keyWheels, drum);
};

describe("M209", () => {
  describe("constructor", () => {
    test("throws when given no key wheels", () => {
      expect(() => new M209([], new Drum([]))).toThrow(RangeError);
    });

    test("throws when given too many key wheels", () => {
      const keyWheels = Array.from(
        { length: 7 },
        () => new KeyWheel("AB", "B"),
      );
      expect(() => new M209(keyWheels, new Drum([]))).toThrow(RangeError);
    });

    test("sets expected defaults", () => {
      const keyWheels = Array.from(
        { length: 6 },
        () => new KeyWheel("ABC", "B"),
      );
      const m209 = new M209(keyWheels, new Drum([]));
      expect(m209.letterCount).toBe(0);
      expect(m209.mode).toBe("cipher");
      expect(m209.display()).toBe("AAAAAA");
      expect(m209.wheelPositions()).toEqual([0, 0, 0, 0, 0, 0]);
    });

    test("sets expected defaults - w/counter", () => {
      const keyWheels = Array.from(
        { length: 6 },
        () => new KeyWheel("ABC", "B"),
      );
      const m209 = new M209(keyWheels, new Drum([]), 42);
      expect(m209.letterCount).toBe(42);
      expect(m209.mode).toBe("cipher");
      expect(m209.display()).toBe("AAAAAA");
      expect(m209.wheelPositions()).toEqual([0, 0, 0, 0, 0, 0]);
    });
  });

  test("Can set key wheels and read display", () => {
    const m209 = buildM209();
    expect(m209.display()).toBe("AAAAAA");
    m209.setKeyWheels("SZKJEI");
    expect(m209.display()).toBe("SZKJEI");
    expect(m209.wheelPositions()).toEqual([18, 24, 10, 9, 4, 8]);
  });

  test("Setting key wheel to invalid letter throws", () => {
    const m209 = buildM209();
    expect(m209.display()).toBe("AAAAAA");
    expect(() => m209.setKeyWheels("SZKJEZ")).toThrow(KeyWheelError);
  });

  describe("letter checks", () => {
    interface LetterCheck {
      lugs: string;
      pinList: string[];
      check: string;
    }

    const letterCheck = ({ lugs, pinList, check }: LetterCheck) => {
      const pt = "A".repeat(26);

      const m209 = buildM209(lugs, pinList);
      m209.mode = "cipher";

      const result = m209.convert(pt);
      expect(result).toBe(check);
      expect(m209.letterCount).toBe(26);

      m209.resetLetterCounter();
      expect(m209.letterCount).toBe(0);
      expect(m209.display()).toBe("AAAAAA");
      m209.mode = "decipher";
      const decrypt = m209.convert(check.replaceAll(" ", ""));
      expect(decrypt).toBe(pt);
      expect(m209.letterCount).toBe(26);
    };

    test("AA letter check", () => {
      // Data taken from Mark J. Blair's AA key list.
      letterCheck({
        lugs: "0-4 0-5*4 0-6*6 1-0*5 1-2 1-5*4 3-0*3 3-4 3-6 5-6",
        pinList: [
          "FGIKOPRSUVWYZ",
          "DFGKLMOTUY",
          "ADEFGIORTUVX",
          "ACFGHILMRSU",
          "BCDEFJKLPS",
          "EFGHIJLMNP",
        ],
        check: "QLRRN TPTFU TRPTN MWQTV JLIJE J",
      });
    });

    test("YL letter check", () => {
      // Data taken from Mark J. Blair's YL key list.
      letterCheck({
        lugs: "1-0 2-0*4 0-3 0-4*3 0-5*3 0-6*11 2-5 2-6 3-4 4-5",
        pinList: [
          "BFJKLOSTUWXZ",
          "ABDJKLMORTUV",
          "EHJKNPQRSX",
          "ABCHIJLMPQR",
          "BCDGJLNOPQS",
          "AEFHIJP",
        ],
        check: "OZGPK AFVAJ JYRZW LRJEG MOVLU M",
      });
    });

    test("FM letter check", () => {
      // Data taken from Mark J. Blair's FM key list.
      letterCheck({
        lugs: "1-0 2-0*8 0-3*7 0-4*5 0-5*2 1-5 1-6 3-4 4-5",
        pinList: [
          "BCEJOPSTUVXY",
          "ACDHJLMNOQRUYZ",
          "AEHJLOQRUV",
          "DFGILMNPQS",
          "CEHIJLNPS",
          "ACDFHIMN",
        ],
        check: "TNMYS CRMKK UHLKW LDQHM RQOLW R",
      });
    });

    test("ZT letter check", () => {
      // Generated from my Python M-209 key list generator.
      letterCheck({
        lugs: "0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6",
        pinList: [
          "ABCEFGHIJMNPQRTWX",
          "ABDGHKMSUXZ",
          "ABCEKLMNORSX",
          "BIJLOQU",
          "BCDEJMQS",
          "ACFGIJKMNOQ",
        ],
        check: "QXIAS TCPIU WZAFN FFSIF AOLSY D",
      });
    });
  });

  describe("Standard procedure", () => {
    let m209: M209;
    let extMsgIndicator: string;
    let sysIndicator: string;

    beforeEach(() => {
      m209 = buildM209("0-4 0-5*2 0-6*10 1-5 2-0 2-5 3-0*6 3-4 3-5 3-6 4-5*2", [
        "FIJKRSTUWZ",
        "BDFJLNOPRTUXYZ",
        "DEFGHIKNOPVX",
        "BCDEFGIJKOR",
        "ACFGHIKOPR",
        "DEJKMNP",
      ]);
      extMsgIndicator = "FPKFMH";
      sysIndicator = "X";
    });

    test("Builds message Python M-209 can decrypt", () => {
      m209.setKeyWheels(extMsgIndicator);

      // Generate internal message indicator.
      m209.mode = "cipher";
      const intMsgIndicator = m209.convert(sysIndicator.repeat(12));
      expect(intMsgIndicator).toBe("HKJBB RSQOT DK");
      m209.resetLetterCounter();

      // Set key wheels to internal message indicator.
      // If a wheel doesn't have a letter from the indicator, we cross it off and
      // move onto the next one. In this case, the last wheel doesn't have R or S,
      // so we use Q.
      m209.setKeyWheels("HKJBBQ");

      // Encrypt the message.
      m209.mode = "cipher";
      const ciphertext = m209.convert(
        "THE PIZZA HAS ARRIVED STOP NO SIGN OF ENEMY FORCES STOP".replaceAll(
          " ",
          "Z",
        ),
      );
      expect(ciphertext).toBe(
        "CHDSI GVPIQ YVCJQ YWLVV JTXCT QHXKW TIJVA DBYSB OVBKU LGEYK QHHBI",
      );
      expect(m209.letterCount).toBe(55);
    });

    test("Decrypts message from Python M-209", () => {
      // Full received message:
      // XXFPK FMHDX CHDSI GVPIQ YVCJQ YWLVV JTXCT QHXKW TIJVA DBYSB OVBKU LGEYK QHHBI XXFPK FMHDX
      //
      // The first 2 groups are:
      // System indicator: X (repeated twice in the message)
      // External indicator: FPKMH
      // Key list indicator: DX
      //
      // These 2 groups also appear on the end of the message.
      // The groups in the middle are the ciphertext.

      // Set key wheels to external indicator.
      m209.mode = "cipher";
      m209.setKeyWheels(extMsgIndicator);

      // Generate internal message indicator.
      const intMsgIndicator = m209.convert(sysIndicator.repeat(12));
      expect(intMsgIndicator).toBe("HKJBB RSQOT DK");
      m209.resetLetterCounter();

      // Set key wheels to internal message indicator.
      // If a wheel doesn't have a letter from the indicator, we cross it off and
      // move onto the next one. In this case, the last wheel doesn't have R or S,
      // so we use Q.
      m209.setKeyWheels("HKJBBQ");

      m209.mode = "decipher";
      const plaintext = m209.convert(
        "CHDSI GVPIQ YVCJQ YWLVV JTXCT QHXKW TIJVA DBYSB OVBKU LGEYK QHHBI".replaceAll(
          " ",
          "",
        ),
      );
      expect(plaintext).toBe(
        "THE PI  A HAS ARRIVED STOP NO SIGN OF ENEMY FORCES STOP",
      );
      expect(m209.letterCount).toBe(55);
    });
  });

  test("Blair decrypt", () => {
    const parseResult = parseDrumLugStr(
      "1-0 2-0*8 0-3*7 0-4*5 0-5*2 1-5 1-6 3-4 4-5",
    );
    if (!parseResult.isValid) {
      expect.fail("Invalid drum lug string");
    }
    const bars = parseResult.drumState;

    const m209 = M209.factory({
      bars: bars,
      pinList: [
        "BCEJOPSTUVXY",
        "ACDHJLMNOQRUYZ",
        "AEHJLOQRUV",
        "DFGILMNPQS",
        "CEHIJLNPS",
        "ACDFHIMN",
      ],
    });

    const sysIndicator = "D";
    const extMsgIndicator = "GPDUCO";

    const ciphertext =
      "DDGPD UCOFM JSCPS XZTGR HHWJG " +
      "BDKKK SHISC IMDFK RLUVH TWGAW " +
      "SUYMM VZBQP OEBJE KPMBW GPGNI " +
      "OFGAL VRYJC LSPLJ GRFYE UQVZT " +
      "PSNDT OAPYG SKGKM CKQTD JCPBE " +
      "NHYRX DDGPD UCOFM";

    m209.mode = "cipher";
    m209.setKeyWheels(extMsgIndicator);
    const intMsgIndicator = m209.convert(sysIndicator.repeat(12));
    expect(intMsgIndicator).toBe("PLIHK WZVIH JE");
    m209.resetLetterCounter();

    // Last wheel doesn't have W, Z, or V, so use I.
    m209.setKeyWheels("PLIHKI");
    m209.mode = "decipher";
    const plaintext = m209.convert(
      ciphertext.replaceAll(" ", "").slice(10, 10 + 24 * 5),
    );
    expect(plaintext).toBe(
      "MISSION ACCOMPLISHED X ALL ENEMY FORCES NEUTRALI ED X  ERO " +
        "CASUALTIES X EIGHT PRISONERS TAKEN X AWAITING FURTHER ORDERSO",
    );
    expect(m209.letterCount).toBe(24 * 5);
  });

  describe("factory constructor", () => {
    let bars: [number, number][];
    let pinList: string[];

    beforeEach(() => {
      const parseResult = parseDrumLugStr(
        "1-0 2-0*8 0-3*7 0-4*5 0-5*2 1-5 1-6 3-4 4-5",
      );
      if (!parseResult.isValid) {
        expect.fail("Invalid drum lug string");
      }
      bars = parseResult.drumState;
      pinList = [
        "BCEJOPSTUVXY",
        "ACDHJLMNOQRUYZ",
        "AEHJLOQRUV",
        "DFGILMNPQS",
        "CEHIJLNPS",
        "ACDFHIMN",
      ];
    });

    test("throws if given invalid drum lug list", () => {
      expect(() => M209.factory({ bars: [], pinList: pinList })).toThrow(
        RangeError,
      );
    });

    test("throws if given invalid pin list", () => {
      expect(() => M209.factory({ bars: bars, pinList: [] })).toThrow(
        RangeError,
      );
    });

    test("throws if given invalid initial position list", () => {
      expect(() =>
        M209.factory({
          bars: bars,
          pinList: pinList,
          initialPositions: [1, 2, 3, 4, 5, 6, 7],
        }),
      ).toThrow(RangeError);
    });
  });

  describe("setKeyWheel", () => {
    let m209: M209;

    beforeEach(() => {
      m209 = buildM209();
    });

    test("throws if given invalid keyWheel index", () => {
      expect(() => m209.setKeyWheel(-1, "A")).toThrow(RangeError);
      expect(() => m209.setKeyWheel(6, "A")).toThrow(RangeError);
    });

    test("valid case - set all to M", () => {
      for (let i = 0; i < 6; ++i) {
        m209.setKeyWheel(i, "M");
      }
      expect(m209.display()).toBe("MMMMMM");
    });

    test("valid cases ", () => {
      for (let i = 0; i < 6; ++i) {
        const letters = KEY_WHEEL_DATA[i]!.letters;
        for (const letter of letters) {
          m209.setKeyWheel(i, letter);
          expect(m209.display()[i]).toBe(letter);
        }
      }
    });

    test("invalid cases", () => {
      expect(() => m209.setKeyWheel(1, "W")).toThrow(KeyWheelError);
      expect(() => m209.setKeyWheel(2, "Z")).toThrow(KeyWheelError);
      expect(() => m209.setKeyWheel(3, "V")).toThrow(KeyWheelError);
      expect(() => m209.setKeyWheel(4, "T")).toThrow(KeyWheelError);
      expect(() => m209.setKeyWheel(5, "R")).toThrow(KeyWheelError);
    });
  });

  describe("convert edge cases", () => {
    let m209: M209;

    beforeEach(() => {
      m209 = buildM209();
    });

    test("empty string", () => {
      expect(m209.convert("")).toBe("");
    });

    test("invalid input throws RangeError", () => {
      expect(() => m209.convert("abc!")).toThrow(RangeError);
    });
  });

  describe("rotateMainAxle", () => {
    let m209: M209;

    beforeEach(() => {
      m209 = buildM209();
    });

    test("can rotate forward", () => {
      expect(m209.display()).toBe("AAAAAA");
      m209.rotateMainAxle(1);
      expect(m209.display()).toBe("BBBBBB");
      m209.rotateMainAxle(2);
      expect(m209.display()).toBe("DDDDDD");
      m209.rotateMainAxle(0);
      expect(m209.display()).toBe("DDDDDD");
      m209.rotateMainAxle(18);
      expect(m209.display()).toBe("VVVACE");

      m209.setKeyWheels("ABCUSQ");
      m209.rotateMainAxle(1);
      expect(m209.display()).toBe("BCDAAA");
    });

    test("can rotate backward", () => {
      expect(m209.display()).toBe("AAAAAA");
      m209.rotateMainAxle(-1);
      expect(m209.display()).toBe("ZZXUSQ");
      m209.rotateMainAxle(-2);
      expect(m209.display()).toBe("XXUSQO");

      m209.setKeyWheels("ABCUSQ");
      m209.rotateMainAxle(-1);
      expect(m209.display()).toBe("ZABTRP");
    });
  });
});
