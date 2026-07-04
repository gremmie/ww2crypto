import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/setupStore.ts";
import type { SwitchOrder } from "./models/switchOrder.ts";
import { isValidPlugboardStr } from "./utils.ts";

export interface PurpleState {
  plugboard: string;
  switchOrder: SwitchOrder;
}

const initialState: PurpleState = {
  plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "1-2-3",
};

export const purpleSlice = createSlice({
  name: "purple",
  initialState: initialState,
  reducers: {
    plugboardSet: (state, action: PayloadAction<string>) => {
      if (isValidPlugboardStr(action.payload)) {
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
