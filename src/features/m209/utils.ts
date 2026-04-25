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

export const drumLugStateToStr = (state: [number, number][]): string => {
  const settings: [left: number, right: number, count: number][] = [];
  for (const pair of state) {
    if (pair[0] === 0 && pair[1] === 0) continue;
    let isDuplicate = false;

    if (settings.length > 0) {
      const last = settings.at(-1);
      if (last && pair[0] === last[0] && pair[1] === last[1]) {
        ++last[2];
        isDuplicate = true;
      }
    }
    if (!isDuplicate) {
      settings.push([...pair, 1]);
    }
  }
  return settings
    .map((item) =>
      item[2] > 1
        ? `${item[0]}-${item[1]}*${item[2]}`
        : `${item[0]}-${item[1]}`,
    )
    .join(" ");
};

export const sortDrumState = (state: [number, number][]): [number, number][] => {
  return state.toSorted((a, b) => {
    // If both left & right are the same.
    if (a[0] === b[0] && a[1] === b[1]) return 0;

    // Left & right are not the same.
    // Move [0, 0] to the end.
    if (a[0] === 0 && a[1] === 0) return 1;
    if (b[0] === 0 && b[1] === 0) return -1;

    // Sort by left first.
    const leftCmp = a[0] - b[0];
    if (leftCmp !== 0) return leftCmp;

    // Lefts are equal, sort by right.
    return a[1] - b[1];
  });
};
