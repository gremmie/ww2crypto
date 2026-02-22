import { beforeEach, describe, expect, test } from "vitest";
import EnigmaMachine from "../../../../src/features/enigma/machine/enigmaMachine.ts";
import Plugboard from "../../../../src/features/enigma/machine/plugboard.ts";
import reflectorFactory from "../../../../src/features/enigma/machine/reflectorFactory.ts";
import rotorFactory from "../../../../src/features/enigma/machine/rotorFactory.ts";
import { toAlphaPlugboardString } from "../../../../src/features/enigma/utils.ts";

describe("EnigmaMachine", () => {
  test("Middle rotor double steps", () => {
    // This example taken from
    // https://www.ciphermachinesandcryptology.com/en/enigmatech.htm#steppingmechanism

    const reflector = reflectorFactory("B")!;
    const rotors = [
      rotorFactory("III")!,
      rotorFactory("II")!,
      rotorFactory("I")!,
    ];
    const m = new EnigmaMachine(reflector, rotors);

    m.setDisplay("KDO");

    const truthData = ["KDP", "KDQ", "KER", "LFS", "LFT", "LFU"];
    for (const display of truthData) {
      m.keyPress("A");
      expect(m.getDisplay(), display);
    }
  });

  describe("Simple cipher test case", () => {
    // This example is taken from Wikipedia.
    let plaintext: string;
    let ciphertext: string;
    let m: EnigmaMachine;

    beforeEach(() => {
      plaintext = "AAAAA";
      ciphertext = "BDZGO";

      const reflector = reflectorFactory("B")!;
      const rotors = [
        rotorFactory("I")!,
        rotorFactory("II")!,
        rotorFactory("III")!,
      ];
      m = new EnigmaMachine(reflector, rotors);
      m.setDisplay("AAA");
    });

    test("Simple encrypt", () => {
      const result = m.processText(plaintext);
      expect(result).toEqual(ciphertext);
    });
  });

  describe("Actual decrypt test case", () => {
    // This example taken from Dirk Rijmenants' simulator manual.
    //
    // It is credited to Frode Weierud and Geoff Sullivan.
    // http://cryptocellar.com
    let m: EnigmaMachine;

    beforeEach(() => {
      const reflector = reflectorFactory("B")!;
      const rotors = [
        rotorFactory("II", "B")!,
        rotorFactory("IV", "U")!,
        rotorFactory("V", "L")!,
      ];
      const plugboard = new Plugboard("AV BS CG DL FU HZ IN KM OW RX");
      m = new EnigmaMachine(reflector, rotors, plugboard);
    });

    function decrypt(
      start: string,
      encryptedKey: string,
      ciphertext: string,
      truthData: string,
    ) {
      // Remove spaces & Kenngruppen from the ciphertext.
      ciphertext = ciphertext.replaceAll(" ", "").substring(5);

      // Remove spaces from the truth data.
      truthData = truthData.replaceAll(" ", "");

      // Decrypt the message key.
      m.setDisplay(start);
      const msgKey = m.processText(encryptedKey);

      // Decrypt the cipher text with the unencrypted message key.
      m.setDisplay(msgKey);
      const plaintext = m.processText(ciphertext);

      expect(plaintext).toEqual(truthData);
    }

    test("Decrypt part 1", () => {
      const ciphertext =
        "RFUGZ EDPUD NRGYS ZRCXN" +
        "UYTPO MRMBO FKTBZ REZKM" +
        "LXLVE FGUEY SIOZV EQMIK" +
        "UBPMM YLKLT TDEIS MDICA" +
        "GYKUA CTCDO MOHWX MUUIA" +
        "UBSTS LRNBZ SZWNR FXWFY" +
        "SSXJZ VIJHI DISHP RKLKA" +
        "YUPAD TXQSP INQMA TLPIF" +
        "SVKDA SCTAC DPBOP VHJK";

      const truthData =
        "AUFKL XABTE ILUNG XVONX" +
        "KURTI NOWAX KURTI NOWAX" +
        "NORDW ESTLX SEBEZ XSEBE" +
        "ZXUAF FLIEG ERSTR ASZER" +
        "IQTUN GXDUB ROWKI XDUBR" +
        "OWKIX OPOTS CHKAX OPOTS" +
        "CHKAX UMXEI NSAQT DREIN" +
        "ULLXU HRANG ETRET ENXAN" +
        "GRIFF XINFX RGTX";

      decrypt("WXC", "KCH", ciphertext, truthData);
    });

    test("Decrypt part 2", () => {
      const ciphertext =
        "FNJAU SFBWD NJUSE GQOBH" +
        "KRTAR EEZMW KPPRB XOHDR" +
        "OEQGB BGTQV PGVKB VVGBI" +
        "MHUSZ YDAJQ IROAX SSSNR" +
        "EHYGG RPISE ZBOVM QIEMM" +
        "ZCYSG QDGRE RVBIL EKXYQ" +
        "IRGIR QNRDN VRXCY YTNJR";

      const truthData =
        "DREIG EHTLA NGSAM ABERS" +
        "IQERV ORWAE RTSXE INSSI" +
        "EBENN ULLSE QSXUH RXROE" +
        "MXEIN SXINF RGTXD REIXA" +
        "UFFLI EGERS TRASZ EMITA" +
        "NFANG XEINS SEQSX KMXKM" +
        "XOSTW XKAME NECXK";

      decrypt("CRS", "YPJ", ciphertext, truthData);
    });
  });

  describe("Kriegsmarine", () => {
    test("M4 decrypt example", () => {
      // This is the Kriegsmarine example from Dirk Rijmenants' simulator manual.
      //
      // It is credited to Stefan Krah and the M4 project:
      // http://www.bytereef.org/m4_project.html
      const stecker = "1/20 2/12 4/6 7/10 8/13 14/23 15/16 17/25 18/26 22/24";

      const reflector = reflectorFactory("B-Thin")!;
      const rotors = [
        rotorFactory("Beta", "A")!,
        rotorFactory("II", "A")!,
        rotorFactory("IV", "A")!,
        rotorFactory("I", "V")!,
      ];
      const plugboard = new Plugboard(toAlphaPlugboardString(stecker));
      const m = new EnigmaMachine(reflector, rotors, plugboard);

      let ciphertext = (
        "FCLC QRKN NCZW VUSX PNYM INHZ XMQX SFWX WLKJ AHSH NMCO CCAK UQPM KCSM" +
        "HKSE INJU SBLK IOSX CKUB HMLL XCSJ USRR DVKO HULX WCCB GVLI YXEO AHXR" +
        "HKKF VDRE WEZL XOBA FGYU JQUK GRTV UKAM EURB VEKS UHHV OYHA BCJW MAKL" +
        "FKLM YFVN RIZR VVRT KOFD ANJM OLBG FFLE OPRG TFLV RHOW OPBE KVWM UQFM" +
        "PWPA RMFH AGKX IIBG FCLC QRKM VA"
      ).replaceAll(" ", "");

      // Remove the message indicators from the message (the first and last 2
      // groups of the message -- it appears the last partial group 'VA' should
      // be removed also).
      ciphertext = ciphertext.slice(8, -10);

      m.setDisplay("VJNA");
      const plaintext = m.processText(ciphertext);

      const truthData = (
        "VONV ONJL OOKS JHFF TTTE" +
        "INSE INSD REIZ WOYY QNNS" +
        "NEUN INHA LTXX BEIA NGRI" +
        "FFUN TERW ASSE RGED RUEC" +
        "KTYW ABOS XLET ZTER GEGN" +
        "ERST ANDN ULAC HTDR EINU" +
        "LUHR MARQ UANT ONJO TANE" +
        "UNAC HTSE YHSD REIY ZWOZ" +
        "WONU LGRA DYAC HTSM YSTO" +
        "SSEN ACHX EKNS VIER MBFA" +
        "ELLT YNNN NNNO OOVI ERYS" +
        "ICHT EINS NULL"
      ).replaceAll(" ", "");

      expect(plaintext).toEqual(truthData);
      expect(m.getDisplay(), "VJWY");
    });

    test("M3 Scharnhorst decrypt", () => {
      // This is the Scharnhorst message taken from
      // https://www.bytereef.org/m4-project-scharnhorst-break.html
      const stecker = "AN EZ HK IJ LR MQ OT PV SW UX";

      const reflector = reflectorFactory("B")!;
      const rotors = [
        rotorFactory("III", "A")!,
        rotorFactory("VI", "H")!,
        rotorFactory("VIII", "M")!,
      ];
      const plugboard = new Plugboard(stecker);
      const m = new EnigmaMachine(reflector, rotors, plugboard);

      const ciphertext =
        "ykaenzapmschzbfocuvmrmdpycofhadzizmefxthflolpzlfggbotgoxgretdwtjiqhlmxvjwkzuastr";

      m.setDisplay("UZV");
      const plaintext = m.processText(ciphertext);

      const truthData =
        "steuerejtanafjordjanstandortquaaacccvierneunneunzwofahrtzwonulsmxxscharnhorsthco".toUpperCase();

      expect(plaintext).toEqual(truthData);
    });

    test("M4 Project second break", () => {
      // https://www.bytereef.org/m4-project-second-break.html
      const reflector = reflectorFactory("B-Thin")!;
      const rotors = [
        rotorFactory("Beta", "A")!,
        rotorFactory("II", "A")!,
        rotorFactory("IV", "N")!,
        rotorFactory("I", "V")!,
      ];
      const plugboard = new Plugboard("AT CL DH EP FG IO JN KQ MU RX");
      const m = new EnigmaMachine(reflector, rotors, plugboard);

      const ciphertext =
        "tmkfnwzxffiiyxutihwmdhxifzeqvkdvmqswbqndyozftiwmjhxhyrpaczugrremvpanwxgtkthn" +
        "rlvhkzpgmnmvsecvckhoinplhhpvpxkmbhokccpdpevxvvhozzqbiyieouseznhjkwhydagtxdjd" +
        "jkjpkcsdsuztqcxjdvlpamgqkkshphvksvpcbuwzfizpfuup";

      m.setDisplay("MCSF");
      const plaintext = m.processText(ciphertext);

      const truthData = (
        "vvvjschreederjaufgeleitkursfuenffuenfgradnichtsgefundenymarscaierebefohlenes" +
        "quadratxstanrortmarquantonjotadreineunneunfuenfxsssooovieryseedremyeinsnulyy" +
        "einsnulbedecktyzwoachtmbsteigtynbbelsichteinssmt"
      ).toUpperCase();

      expect(plaintext).toEqual(truthData);
    });

    test("HMS Hurricane intercept", () => {
      // https://www.enigma.hoerenberg.com/index.php?cat=M4%20Project%202006&page=Rasch%20Message
      const reflector = reflectorFactory("B-Thin")!;
      const rotors = [
        rotorFactory("Beta", "Z")!,
        rotorFactory("VI", "Z")!,
        rotorFactory("I", "D")!,
        rotorFactory("III", "G")!,
      ];
      const plugboard = new Plugboard("BQ CR DI EJ KW MT OS PX UZ GH");
      const m = new EnigmaMachine(reflector, rotors, plugboard);

      const ciphertext =
        "HCEYZTCSOPUPPZDICQRDLWXXFACTTJMBRDVCJJMMZRPYIKHZAWGLYXWTMJPQUEFSZBOTVR" +
        "LALZXWVXTSLFFFAUDQFBWRRYAPSBOWJMKLDUYUPFUQDOWVHAHCDWAUARSWTKOFVOYFPUFH" +
        "VZFDGGPOOVGRMBPXXZCANKMONFHXPCKHJZBUMXJWXKAUODXZUCVCXPFT";

      m.setDisplay("NAQL");
      const plaintext = m.processText(ciphertext);

      const truthData =
        "BOOTKLARXBEIJSCHNOORBETWAZWOSIBENXNOVXSECHSNULCBMXPROVIANTBISZWONULXDE" +
        "ZXBENOETIGEGLMESERYNOCHVIEFKLHRXSTEHEMARQUBRUNOBRUNFZWOFUHFXLAGWWIEJKC" +
        "HAEFERJXNNTWWWFUNFYEINSFUNFMBSTEIGENDYGUTESIWXDVVVJRASCH";

      expect(plaintext).toEqual(truthData);
    });

    describe("Compatibility with 3-rotor models", () => {
      test("Beta rotor", () => {
        const reflectorB = reflectorFactory("B")!;
        const threeRotors = [
          rotorFactory("III", "Q")!,
          rotorFactory("I", "B")!,
          rotorFactory("V", "F")!,
        ];
        const plugboard = new Plugboard("CM DT EH FQ IU JP KV LS NX OR");
        const m3 = new EnigmaMachine(reflectorB, threeRotors, plugboard);

        const plaintext =
          "LETSGETPIZZATONIGHTXIWILLARRIVEATNINETEENHUNDREDHOURSXORDERTHEUSUAL";

        m3.setDisplay("BGN");
        const ciphertext = m3.processText(plaintext);

        const reflectorBThin = reflectorFactory("B-Thin")!;
        const fourRoters = [
          rotorFactory("Beta", "A")!,
          rotorFactory("III", "Q")!,
          rotorFactory("I", "B")!,
          rotorFactory("V", "F")!,
        ];
        const m4 = new EnigmaMachine(reflectorBThin, fourRoters, plugboard);
        m4.setDisplay("ABGN");

        expect(plaintext).toEqual(m4.processText(ciphertext));
      });

      test("Gamma rotor", () => {
        const reflectorC = reflectorFactory("C")!;
        const threeRotors = [
          rotorFactory("VI", "T")!,
          rotorFactory("VII", "I")!,
          rotorFactory("I", "R")!,
        ];
        const plugboard = new Plugboard("AG BI DH EK FZ JS LM OR PV QW");
        const m3 = new EnigmaMachine(reflectorC, threeRotors, plugboard);

        const plaintext =
          "LETSGETPIZZATONIGHTXIWILLARRIVEATNINETEENHUNDREDHOURSXORDERTHEUSUAL";

        m3.setDisplay("BGN");
        const ciphertext = m3.processText(plaintext);

        const reflectorCThin = reflectorFactory("C-Thin")!;
        const fourRoters = [
          rotorFactory("Gamma", "A")!,
          rotorFactory("VI", "T")!,
          rotorFactory("VII", "I")!,
          rotorFactory("I", "R")!,
        ];
        const m4 = new EnigmaMachine(reflectorCThin, fourRoters, plugboard);
        m4.setDisplay("ABGN");

        expect(plaintext).toEqual(m4.processText(ciphertext));
      });
    });
  });
});
