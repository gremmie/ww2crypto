export const SWITCH_ORDERS = [
  "1-2-3",
  "1-3-2",
  "2-1-3",
  "2-3-1",
  "3-1-2",
  "3-2-1",
] as const;

export type SwitchOrder = (typeof SWITCH_ORDERS)[number];
