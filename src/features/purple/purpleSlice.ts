import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/setupStore.ts";
import type { SwitchOrder } from "./models/switchOrder.ts";
import { isValidHumanPlugboardStr } from "./utils.ts";

export interface PurpleState {
  plugboard: string;
  switchOrder: SwitchOrder;
  switchPositions: number[];
  isEncryptMode: boolean;
}

const initialState: PurpleState = {
  plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "1-2-3",
  switchPositions: [0, 0, 0, 0],
  isEncryptMode: true,
};

export const purpleSlice = createSlice({
  name: "purple",
  initialState: initialState,
  reducers: {
    plugboardSet: (state, action: PayloadAction<string>) => {
      if (isValidHumanPlugboardStr(action.payload)) {
        state.plugboard = action.payload.replaceAll(" ", "").toUpperCase();
      }
    },
    switchOrderSet: (state, action: PayloadAction<SwitchOrder>) => {
      state.switchOrder = action.payload;
    },
  },
});

export const { plugboardSet, switchOrderSet } = purpleSlice.actions;

export default purpleSlice.reducer;

export const selectPlugboard = (state: RootState) => state.purple.plugboard;
export const selectSwitchOrder = (state: RootState) => state.purple.switchOrder;
