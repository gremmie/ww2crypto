/**
 * This data is taken from Dirk Rijmenants very informative and useful Enigma
 * website: "Technical Details of the Enigma Machine"
 * https://www.ciphermachinesandcryptology.com/en/enigmatech.htm
 *
 * Rotors I-V were used by the Heer, Luftwaffe, and Kriegsmarine. The
 * Kriegsmarine added rotors VI-VIII to the M3 model, and added Beta & Gamma to
 * the M4 model (used with thin reflectors only). Note that Beta & Gamma rotors
 * did not rotate.
 *
 * The Heer, Luftwaffe, & Kriegsmarine M3 machines used reflectors B & C,
 * while the Kriegsmarine M4 used thin reflectors B & C.
 */

interface RotorData {
  wiring: string;
  stepping: string[];
}

export const rotorDataByType = new Map<string, RotorData>([
  ["I", { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", stepping: ["Q"] }],
  ["II", { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", stepping: ["E"] }],
  ["III", { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", stepping: ["V"] }],
  ["IV", { wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", stepping: ["J"] }],
  ["V", { wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", stepping: ["Z"] }],
  ["VI", { wiring: "JPGVOUMFYQBENHZRDKASXLICTW", stepping: ["Z", "M"] }],
  ["VII", { wiring: "FKQHTLXOCBJSPDZRAMEWNIUYGV", stepping: ["Z", "M"] }],
  ["Beta", { wiring: "LEYJVCNIXWPBQMDRTAKZGFUHOS", stepping: [] }],
  ["Gamma", { wiring: "FSOKANUERHMBTIYCWLQPZXVGJD", stepping: [] }],
]);

export const reflectorDataByType = new Map<string, string>([
  ["B", "YRUHQSLDPXNGOKMIEBFZCWVJAT"],
  ["C", "FVPJIAOYEDRZXWGCTKUQSBNMHL"],
  ["B-Thin", "ENKQAUYWJICOPBLMDXZVFTHRGS"],
  ["C-Thin", "RDOBJNTKVEHMLFCWZAXGYIPSUQ"],
]);
