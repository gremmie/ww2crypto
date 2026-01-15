import type { MachineConfig } from "./config/machineConfig.ts";

export const aCode = "A".charCodeAt(0);

export function toNumericPlug(c: string) {
  return c.charCodeAt(0) - aCode + 1;
}

export function toNumericConnection(c: string) {
  return `${toNumericPlug(c[0])}/${toNumericPlug(c[1])}`;
}

export function isValidPlugboardString(s: string, cableCount: number) {
  const regexStr = Array.from({ length: cableCount }, () => "[a-zA-Z]{2}").join(
    "\\s+",
  );
  const regex = new RegExp(`^${regexStr}$`);
  if (!regex.test(s)) return false;

  // Every plug has to appear exactly once.
  const noSpaces = s.replaceAll(/\s/g, "").toUpperCase();
  const plugByCount = new Map<string, number>();
  for (let i = 0; i < noSpaces.length; ++i) {
    const c = noSpaces[i];
    const count = plugByCount.get(c) ?? 0;
    plugByCount.set(c, count + 1);
  }
  const values = Array.from(plugByCount.values());
  return values.every((c) => c === 1);
}

export function isValidNumericPlugboardString(s: string, cableCount: number) {
  const regexStr = Array.from(
    { length: cableCount },
    () => "\\d{1,2}/\\d{1,2}",
  ).join("\\s+");
  const regex = new RegExp(`^${regexStr}$`);
  if (!regex.test(s)) return false;

  // Every plug has to appear exactly once.
  const numbers = s.replaceAll(/\s/g, "/").split("/");
  const plugByCount = new Map<string, number>();
  for (let i = 0; i < numbers.length; ++i) {
    const count = plugByCount.get(numbers[i]) ?? 0;
    plugByCount.set(numbers[i], count + 1);
  }
  const values = Array.from(plugByCount.values());
  return values.every((c) => c === 1);
}

/**
 * Normalizes a plugboard string by converting to uppercase and sorting each plug pair.
 * @param {string} s - the plugboard string, which must be valid in letter notation.
 */
export function normalizePlugboardString(s: string) {
  let connections =
    s === "" ? [] : s.replaceAll(/\s+/g, " ").toUpperCase().split(" ");
  // Sort the letter pairs for each connection.
  connections = connections.map((c) => c.split("").sort().join(""));
  return connections.sort().join(" ");
}

/**
 * Converts an alphabetical plugboard string to a numeric one.
 *
 * Assumes the given plugboard string is valid and has been normalized prior
 * to calling this function.
 */
export function toNumericPlugboardString(s: string) {
  if (s === "") return "";
  const alpha = s.split(" ");

  const numeric = alpha.map((c) => {
    const [a, b] = c.split("");
    return `${toNumericPlug(a)}/${toNumericPlug(b)}`;
  });
  return numeric.join(" ");
}

/**
 * Converts a numeric plugboard string to an alphabetical one.
 *
 * Assumes the given plugboard string is valid prior to calling this function.
 */
export function toAlphaPlugboardString(s: string) {
  if (s === "") return "";
  const connections = s.replaceAll(/\s+/g, " ").split(" ");
  const alpha = connections.map((pair) => {
    const [a, b] = pair.split("/");
    const m = String.fromCharCode(aCode + parseInt(a) - 1);
    const n = String.fromCharCode(aCode + parseInt(b) - 1);
    return m + n;
  });
  return normalizePlugboardString(alpha.join(" "));
}

export function isValidRotorWiring(wiring: string) {
  if (!/^[A-Z]{26}$/.test(wiring)) return false;

  // Every letter must appear once.
  const countsByLetter = new Map<string, number>();
  for (const c of wiring) {
    const count = countsByLetter.get(c) ?? 0;
    countsByLetter.set(c, count + 1);
  }
  const counts = Array.from(countsByLetter.values());
  return counts.every((c) => c === 1);
}

/**
 * A mathematical modulo function (always returns a non-negative result if the
 * divisor is positive).
 *
 * @param n {number} - dividend
 * @param d {number} - divisor
 */
export function modulo(n: number, d: number): number {
  return ((n % d) + d) % d;
}

/**
 * Groups the given string into n-letter groups, delimited with spaces.
 *
 * @param s {string} - the input string
 * @param n {number} - the group size in characters
 * @returns {string} - a grouped version of the input s
 */
export function groupText(s: string, n: number = 5): string {
  const groups: Array<string> = [];
  for (let i = 0; i < s.length; i += n) {
    groups.push(s.slice(i, i + n));
  }
  return groups.join(" ");
}

/**
 * Returns a summary string for a given MachineConfig.
 *
 * @param config {MachineConfig} - the config to produce the summary for
 * @returns {string} - the summary string
 */
export function setupSummary(config: MachineConfig): string {
  const rotors = config.rotors.join(" ");

  const rings = config.rings
    .map((r) =>
      config.ringNotation === "number" ? r + 1 : String.fromCharCode(aCode + r),
    )
    .join(" ");

  const plugboard =
    config.plugboardNotation == "letter"
      ? config.plugboard
      : toNumericPlugboardString(config.plugboard);

  return `${config.reflector} : ${rotors} : ${rings} : ${plugboard}`;
}
