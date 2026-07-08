import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/setupStore.ts";
import type { Mode } from "./machine/mode.ts";
import type { SwitchOrder } from "./models/switchOrder.ts";
import { isValidHumanPlugboardStr } from "./utils.ts";

export interface PurpleState {
  plugboard: string;
  switchOrder: SwitchOrder;
  switchPositions: number[];
  isEncryptMode: boolean;
  mode: Mode;
}

const initialState: PurpleState = {
  plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "1-2-3",
  switchPositions: [0, 0, 0, 0],
  isEncryptMode: true,
  mode: "encrypt",
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
    switchPositionUpdated: (
      state,
      action: PayloadAction<{ newPos: number; index: number }>,
    ): void => {
      const { newPos, index } = action.payload;
      if (newPos >= 0 && newPos < 25 && index >= 0 && index < 4) {
        state.switchPositions[index] = newPos;
      }
    },
    modeToggled: (state) => {
      state.mode = state.mode === "encrypt" ? "decrypt" : "encrypt";
    },
    switchesReset: (state) => {
      state.switchPositions.fill(0);
    },
  },
});

export const {
  plugboardSet,
  switchOrderSet,
  switchPositionUpdated,
  modeToggled,
  switchesReset,
} = purpleSlice.actions;

export default purpleSlice.reducer;

export const selectPlugboard = (state: RootState) => state.purple.plugboard;

export const selectSwitchOrder = (state: RootState) => state.purple.switchOrder;

export const selectSwitchPositions = (state: RootState) =>
  state.purple.switchPositions;

export const selectSwitchPosition = (state: RootState, switchId: number) => {
  if (switchId < 0 || switchId > 3) {
    throw new RangeError(
      `Invalid switchId: ${switchId}. Must be 0, 1, 2, or 3.`,
    );
  }
  return state.purple.switchPositions[switchId]!;
};

export const selectMode = (state: RootState) => state.purple.mode;
