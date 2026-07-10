import type { SwitchOrder } from "../models/switchOrder.ts";

export interface PurpleConfig {
  type: "purple";
  id: string;
  name: string;
  createdAt: string; // ISO 8601 format
  plugboard: string;
  switchOrder: SwitchOrder;
}
