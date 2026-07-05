const plugboardRegex = /^[A-Z]{26}$/;

/**
 * Determines if the given human-entered string is a valid plugboard string.
 *
 * @param plugboardStr - the string to validate; lowercase letters and spaces are allowed
 * @returns true if the string is valid and false otherwise
 */
export const isValidHumanPlugboardStr = (plugboardStr: string) => {
  const s = plugboardStr.replaceAll(" ", "").toUpperCase();
  if (!plugboardRegex.test(s)) return false;
  return new Set(s).size === 26;
};

/**
 * Determines if the given string is a valid plugboard string.
 *
 * @param plugboardStr - the string to validate; only 26 unique uppercase letters are allowed.
 * @returns true if the string is valid and false otherwise
 */
export const isValidPlugboardStr = (plugboardStr: string) => {
  if (!plugboardRegex.test(plugboardStr)) return false;
  return new Set(plugboardStr).size === 26;
};
