export const SwitchType = {
  Sixes: 0,
  Twenties1: 1,
  Twenties2: 2,
  Twenties3: 3,
} as const;

export type SwitchType = (typeof SwitchType)[keyof typeof SwitchType];
