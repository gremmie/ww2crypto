const plugboardRegex = /^[A-Z]{26}$/;

export const isValidPlugboardStr = (plugboardStr: string) => {
  const s = plugboardStr.replaceAll(" ", "").toUpperCase();
  if (!plugboardRegex.test(s)) return false;
  return new Set(s).size === 26;
};
