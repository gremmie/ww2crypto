import { beforeEach, describe, expect, test } from "vitest";
import { Purple } from "../../../../src/features/purple/machine/purple.ts";

describe("Purple Machine tests", () => {
  describe("Part 1 of 14-part message tests", () => {
    let part1Ciphertext: string;
    let part1Plaintext: string;
    let purple: Purple;

    beforeEach(() => {
      part1Ciphertext = [
        "ZTXODNWKCCMAVNZXYWEETUQTCIMNVEUVIWBLUAXRRTLVA",
        "RGNTPCNOIUPJLCIVRTPJKAUHVMUDTHKTXYZELQTVWGBUHFAWSH",
        "ULBFBHEXMYHFLOWD-KWHKKNXEBVPYHHGHEKXIOHQHUHWIKYJYH",
        "PPFEALNNAKIBOOZNFRLQCFLJTTSSDDOIOCVT-ZCKQTSHXTIJCN",
        "WXOKUFNQR-TAOIHWTATWVHOTGCGAKVANKZANMUIN",
        "YOYJFSRDKKSEQBWKIOORJAUWKXQGUWPDUDZNDRMDHVHYPNIZXB",
        "GICXRMAWMFTIUDBXIENLONOQVQKYCOTVSHVNZZQPDLMXVNRUUN",
        "QFTCDFECZDFGMXEHHWYONHYNJDOVJUNCSUVKKEIWOLKRBUUSOZ",
        "UIGNISMWUOSBOBLJXERZJEQYQMTFTXBJNCMJKVRKOTSOPBOYMK",
        "IRETINCPSQJAWVHUFKRMAMXNZUIFNOPUEMHGLOEJHZOOKHHEED",
        "NIHXFXFXGPDZBSKAZABYEKYEPNIYSHVKFRFPVCJTPTOYCNEIQB",
        "FEXMERMIZLGDRXZORLZFSQYPZFATZCHUGRNHWDDTAIHYOOCOOD",
        "UZYIWJROOJUMUIHRBEJFONAXGNCKAOARDIHCDZKIXPR--DIMUW",
        "OMHLTJSOUXPFKGEPWJOMTUVKMWRKTACUPIGAFEDFVRKXFXLFGU",
        "RDETJIYOLKBHZKXOJDDOVRHMMUQBFOWRODMRMUWNAYKYPISDLH",
        "ECKINLJORKWNWXADAJOLONOEVMUQDFIDSPEBBPWROFBOPAZJEU",
        "USBHGIORCSUUQKIIEHPCTJRWSOGLETZLOUKKEOJOSMKJBWUCDD",
        "CPYUUWCSSKWWVLIUPKYXGKQOKAZTEZFHGVPJFEWEUBKLIZLWKK",
        "OBXLEPQPDATWUSUUPKYRHNWDZXXGTWDDNSHDCBCJXAOOEEPUBP",
        "WFRBQSFXSEZJJYAANMG-WLYMGWAQDGIVNOHKOUTIXYFOKNGGBF",
        "GANPWTUYLBEFFKUFLEXOIUUANVMMJEQUSFHFDOHQLAKWTBYYYL",
        "NTLYTSXCGKCEEWQRYAVGRKXIANPXNOFVXGKJFAVKLTHOCXCIVK",
        "OLXTJTUNCLQCICRUIIWQDDMOTPRVTJKKSKFHXFKMDIKIZWROGZ",
        "JYMTMNOVMFJ-OKTEIVMYANOHNNYPDLEXCFRRNEBLMNYEBGNHCZ",
        "ZCFNWGGRHRIUUTTILKLODUYZKQOZMMNHASXHLPVTNGHQDAJIUG",
        "OOSZ-----ZRTGWFBLKI--------YBDABJ-----WYOEANV---OM",
      ].join("");

      part1Plaintext = [
        "FOVTATAKIDASINIMUIMINOMOXIWOIRUBESIFYXXFCKZZR",
        "DXOOVBTNFYXFAEMEMORANDUMFIOFOVOOMOJIBAKARIFYXRAICC",
        "YLFCBBCFCTHEGOVE-NMENTOFJAPANLFLPROMPTEDBYAGENUINE",
        "DESIRETOCOMETOANAMICABLEUNDERSTANDIN-WITHTHEGOVERN",
        "MENTOFTHE-NITEDSTATESINORDERTHATTHETWOCO",
        "UNTRIESBYTHEIRJOINTEFFORTSMAYSECURETHEPEACEOFTHEPA",
        "CIFICAREAANDTHEREBYCONTRIBUTETOWARDTHEREALIZATIONO",
        "FWORLDPEACELFLHASCONTINUEDNEGOTIATIONSWITHTHEUTMOS",
        "TSINCERITYSINCEAPRILLASTWITHTHEGOVERNMENTOFTHEUNIT",
        "EDSTATESREGARDINGTHEADJUSTMENTANDADVANCEMENTOFJAPA",
        "NESEVVFAMERICANRELATIONSANDTHESTABILIZATIONOFTHEPA",
        "CIFICAREACFCCCFTHEJAPANESEQOVERNMENXHASTHEHONORTOS",
        "TATEFRANKLYITSVIEWSCONCERNINGTHECLAIMSTHEAM--VCANG",
        "OVERNMENTHASUERSISTENTLYMAINTAINEDASWELLASTHEMEASU",
        "RESTHEUNITEDSTATESANDGREATBRITAINHAVETAKENTOWARDJA",
        "PANDURINGTHKSEEIGHTMONTHSCYCCCFLFCDDCFCITISTHEIMMU",
        "TABLXPOLWCYOFTHEJAPANESEGOVERNMENTTOINSURETHESTABI",
        "LITYOFEASTASIAANDTOPROMOTEWORLZPEACELFLANDTHEREBYT",
        "OEIABLEALLNATIONSTOFINDEACHITSPROPERPLACEINTHEWORL",
        "DCFCCCFEVERSINCETHE-HINAAFFAIRBROKEOUTOWINGTOTHEFA",
        "ILUREONTHEPARTOFCHINATOCOMPREHENLJAPANVCFSTRUEYNTE",
        "NTIONSLFLTWEJAPANESEGOVERNMENTHASSTRIVENFORTHEREST",
        "ORATIONOFPEACEANDIMHASCONSISTENTLYEXERTEDITSBESTEF",
        "FORTSTOPREV-NTTHEEXTENTIONOFWARVVFLIKEVISTURBANCES",
        "CFCNSIASALSOTOTHATENDTNATINSEPTEMBERLASTYEARJAPANC",
        "ONCL-----HETRIPAITI--------THGERM-----DYTALYC---OV",
      ].join("");

      const plugboard = "NOKTYUXEQLHBRMPDICJASVWGZF";
      const switchPositions = [8, 0, 23, 5];
      const switchOrder = "2-3-1";

      purple = new Purple({
        switchPositions: switchPositions,
        switchOrder: switchOrder,
        plugboard: plugboard,
      });
    });

    test("Decrypt", () => {
      expect(part1Ciphertext.length).toBe(part1Plaintext.length);

      purple.setMode("decrypt");
      const plaintext = purple.processText(part1Ciphertext);
      expect(plaintext).toBe(part1Plaintext);
    });

    test("Encrypt", () => {
      expect(part1Ciphertext.length).toBe(part1Plaintext.length);

      // The plaintext in our data was constructed from a garbled decrypt.
      // Let's just jam X's in those locations, and check the output for garble
      // indicators to make the test pass.
      const plaintext = part1Plaintext.replaceAll("-", "X");

      purple.setMode("encrypt");
      const ciphertext = purple.processText(plaintext);

      expect(ciphertext.length).toBe(part1Ciphertext.length);
      const mismatches: string[] = [];
      for (let i = 0; i < ciphertext.length; ++i) {
        const actual = ciphertext.charAt(i);
        const expected = part1Ciphertext.charAt(i);
        if (actual !== expected && expected !== "-") {
          mismatches.push(actual);
        }
      }
      expect(mismatches).toHaveLength(0);
    });
  });

  describe("construction", () => {
    test("can be constructed with no options and defaults to encrypt mode", () => {
      const purple = new Purple({});
      expect(purple.getMode()).toBe("encrypt");
    });

    test("accepts switch positions at both boundaries", () => {
      // Switches have 25 positions, so the valid 0-based range is 0..24.
      expect(() => new Purple({ switchPositions: [0, 0, 0, 0] })).not.toThrow();
      expect(
        () => new Purple({ switchPositions: [24, 24, 24, 24] }),
      ).not.toThrow();
    });

    test("rejects switch positions of the wrong length", () => {
      expect(() => new Purple({ switchPositions: [0, 0, 0] })).toThrow(
        RangeError,
      );
      expect(() => new Purple({ switchPositions: [0, 0, 0, 0, 0] })).toThrow(
        RangeError,
      );
    });

    test("rejects out-of-range switch positions", () => {
      expect(() => new Purple({ switchPositions: [-1, 0, 0, 0] })).toThrow(
        RangeError,
      );
      // 25 is just past the valid range: switches have 25 positions (0..24).
      expect(() => new Purple({ switchPositions: [25, 0, 0, 0] })).toThrow(
        RangeError,
      );
      expect(() => new Purple({ switchPositions: [0, 0, 0, 26] })).toThrow(
        RangeError,
      );
    });

    test("rejects an invalid plugboard string", () => {
      expect(() => new Purple({ plugboard: "ABC" })).toThrow(RangeError); // too short
      expect(() => new Purple({ plugboard: "1".repeat(26) })).toThrow(
        RangeError,
      ); // not letters
      // 26 letters, but a duplicated A and missing Z: not a permutation
      expect(
        () => new Purple({ plugboard: "AABCDEFGHIJKLMNOPQRSTUVWXY" }),
      ).toThrow(RangeError);
    });

    test("accepts a valid permuted plugboard", () => {
      expect(
        () => new Purple({ plugboard: "NOKTYUXEQLHBRMPDICJASVWGZF" }),
      ).not.toThrow();
    });

    test("honors the initial mode option", () => {
      expect(new Purple({ mode: "decrypt" }).getMode()).toBe("decrypt");
      expect(new Purple({ mode: "encrypt" }).getMode()).toBe("encrypt");
    });
  });

  describe("mode", () => {
    test("setMode updates the mode reported by getMode", () => {
      const purple = new Purple({});
      purple.setMode("decrypt");
      expect(purple.getMode()).toBe("decrypt");
      purple.setMode("encrypt");
      expect(purple.getMode()).toBe("encrypt");
    });

    test("processText dispatches to encrypt or decrypt based on mode", () => {
      const config = { plugboard: "NOKTYUXEQLHBRMPDICJASVWGZF" };
      const plaintext = "THEQUICKBROWNFOX";

      const encryptor = new Purple({ ...config, mode: "encrypt" });
      const ciphertext = encryptor.processText(plaintext);

      const decryptor = new Purple({ ...config, mode: "decrypt" });
      expect(decryptor.processText(ciphertext)).toBe(plaintext);
    });
  });

  describe("processText input validation", () => {
    test("encrypt mode rejects characters that are not A-Z", () => {
      const purple = new Purple({ mode: "encrypt" });
      expect(() => purple.processText("abc")).toThrow(RangeError);
      expect(() => purple.processText("AB1")).toThrow(RangeError);
      // A garble marker is only valid when decrypting.
      expect(() => purple.processText("A-B")).toThrow(RangeError);
    });

    test("decrypt mode rejects non A-Z characters other than the garble marker", () => {
      const purple = new Purple({ mode: "decrypt" });
      expect(() => purple.processText("abc")).toThrow(RangeError);
      expect(() => purple.processText("AB1")).toThrow(RangeError);
    });

    test("decrypt mode passes the '-' garble marker through unchanged", () => {
      const purple = new Purple({ mode: "decrypt" });
      const output = purple.processText("A-B");
      expect(output).toHaveLength(3);
      expect(output.charAt(1)).toBe("-");
    });

    test("returns an empty string for empty input", () => {
      expect(new Purple({}).processText("")).toBe("");
    });
  });

  describe("encrypt / decrypt behavior", () => {
    test("decrypt inverts encrypt with identical settings", () => {
      const config = {
        plugboard: "NOKTYUXEQLHBRMPDICJASVWGZF",
        switchPositions: [8, 0, 23, 5],
        switchOrder: "2-3-1" as const,
      };
      const plaintext = "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG";

      const encryptor = new Purple({ ...config, mode: "encrypt" });
      const ciphertext = encryptor.processText(plaintext);
      expect(ciphertext).not.toBe(plaintext);

      const decryptor = new Purple({ ...config, mode: "decrypt" });
      expect(decryptor.processText(ciphertext)).toBe(plaintext);
    });

    test("steps the switches so a repeated letter does not map to a constant", () => {
      const purple = new Purple({ mode: "encrypt" });
      const output = purple.processText("A".repeat(30));
      expect(new Set(output).size).toBeGreaterThan(1);
    });
  });

  describe("switchPositions", () => {
    test("defaults to all zeros", () => {
      expect(new Purple({}).switchPositions()).toEqual([0, 0, 0, 0]);
    });

    test("reports the initial positions as [sixes, twenties 1, 2, 3]", () => {
      const purple = new Purple({ switchPositions: [8, 0, 23, 5] });
      expect(purple.switchPositions()).toEqual([8, 0, 23, 5]);
    });

    test("reports twenties in 1-2-3 order regardless of switchOrder", () => {
      // switchOrder only sets which switch is fast/middle/slow when stepping;
      // the reported order always follows twenties 1, 2, 3.
      const purple = new Purple({
        switchPositions: [8, 0, 23, 5],
        switchOrder: "2-3-1",
      });
      expect(purple.switchPositions()).toEqual([8, 0, 23, 5]);
    });

    test("advances as text is processed (sixes steps every letter)", () => {
      // Default switchOrder "1-2-3" makes twenties 1 the fast switch, so after
      // one letter the sixes and the fast switch each step once.
      const purple = new Purple({ mode: "encrypt" });
      purple.processText("A");
      expect(purple.switchPositions()).toEqual([1, 1, 0, 0]);
    });
  });
});
