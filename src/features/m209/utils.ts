const lugStrRegex = /^(\d-\d(\*\d\d?)?)(\s+\d-\d(\*\d\d?)?){0,26}$/;
const repeatRegex = /^\d-\d\*(\d\d?)$/;

export type ParseDrumLugStrResult =
  | {
      isValid: true;
      drumState: [number, number][];
    }
  | {
      isValid: false;
    };

export const parseDrumLugStr = (s: string): ParseDrumLugStrResult => {
  const lugStr = s.trim();
  if (!lugStrRegex.test(lugStr.trim())) return { isValid: false };

  const parts = lugStr.replaceAll(/\s+/g, () => " ").split(" ");
  let barCount = 0;
  const drumState: [number, number][] = Array.from({ length: 27 }, () => [
    0, 0,
  ]);

  for (const part of parts) {
    const left = parseInt(part[0]!);
    const right = parseInt(part[2]!);
    if (left < 0 || left > 5 || right < 0 || right > 6) {
      return { isValid: false };
    }
    if (left !== 0 && right !== 0 && left >= right) {
      return { isValid: false };
    }
    const matches = part.match(repeatRegex);
    if (matches && matches.length > 1) {
      const count = parseInt(matches[1]!);
      if (barCount + count > drumState.length) return { isValid: false };
      for (let i = 0; i < count; ++i) {
        drumState[barCount++] = [left, right];
      }
    } else {
      if (barCount >= drumState.length) return { isValid: false };
      drumState[barCount++] = [left, right];
    }
  }
  return { isValid: true, drumState: drumState };
};
