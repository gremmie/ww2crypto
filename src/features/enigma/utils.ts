export const aCode = "A".charCodeAt(0);

export function toNumericPlug(c: string) {
  return c.charCodeAt(0) - aCode + 1;
}

export function toNumericConnection(c: string) {
  return `${toNumericPlug(c[0])}-${toNumericPlug(c[1])}`;
}

export function isValidPlugboardString(s: string, n: number) {
  const regexStr = Array.from({ length: n }, () => "[a-zA-Z]{2}").join("\\s+");
  const regex = new RegExp(`^${regexStr}$`);
  if (!regex.test(s)) return false;

  // Every plug has to appear exactly once.
  const noSpaces = s.replaceAll(/\s/g, "");
  const plugByCount = new Map<string, number>();
  for (let i = 1; i < noSpaces.length; ++i) {
    const c = noSpaces[i].toUpperCase();
    const count = plugByCount.get(c) ?? 0;
    plugByCount.set(c, count + 1);
  }
  const values = Array.from(plugByCount.values());
  return values.every((c) => c === 1);
}

export function isValidNumericPlugboardString(s: string, n: number) {
  const regexStr = Array.from({ length: n }, () => "\\d{1,2}-\\d{1,2}").join(
    "\\s+",
  );
  const regex = new RegExp(`^${regexStr}$`);
  if (!regex.test(s)) return false;

  // Every plug has to appear exactly once.
  const numbers = s.replaceAll(/\s/g, "-").split("-");
  const plugByCount = new Map<string, number>();
  for (let i = 1; i < numbers.length; ++i) {
    const count = plugByCount.get(numbers[i]) ?? 0;
    plugByCount.set(numbers[i], count + 1);
  }
  const values = Array.from(plugByCount.values());
  return values.every((c) => c === 1);
}

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
    return `${toNumericPlug(a)}-${toNumericPlug(b)}`;
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
    const [a, b] = pair.split("-");
    const m = String.fromCharCode(aCode + parseInt(a) - 1);
    const n = String.fromCharCode(aCode + parseInt(b) - 1);
    return m + n;
  });
  return normalizePlugboardString(alpha.join(" "));
}
