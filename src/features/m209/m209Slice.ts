import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";
import { sortDrumState } from "./utils.ts";

const numBars = 27;
const numWheels = 6;

export interface M209State {
  drumState: [number, number][];
  wheelState: string[];
  selectedWheel: number;
}

const initialState: M209State = {
  drumState: Array.from({ length: numBars }, () => [0, 0]),
  wheelState: Array.from({ length: numWheels }, () => ""),
  selectedWheel: 0,
};

export interface DrumBarChangedPayload {
  // 1-based bar number (1-27)
  barId: number;
  newState: [number, number];
}

export const m209Slice = createSlice({
  name: "m209",
  initialState: initialState,
  reducers: {
    drumBarChanged: (state, action: PayloadAction<DrumBarChangedPayload>) => {
      const index = action.payload.barId - 1;
      if (index < 0 || index >= numBars) return;

      state.drumState[index] = action.payload.newState;
    },
    resetAllLugs: (state) => {
      for (const lugs of state.drumState) {
        lugs[0] = 0;
        lugs[1] = 0;
      }
    },
    bulkSetLugs: (state, action: PayloadAction<[number, number][]>) => {
      const newDrumState = action.payload;
      if (newDrumState.length !== numBars) return;
      state.drumState = [...newDrumState];
    },
    sortAllLugs: (state) => {
      state.drumState = sortDrumState(state.drumState);
    },
    wheelSelected: (state, action: PayloadAction<number>) => {
      const newSelectedWheel = action.payload;
      if (newSelectedWheel >= 0 && newSelectedWheel <= numWheels) {
        state.selectedWheel = action.payload;
      }
    },
    selectedWheelPinsChanged: (state, action: PayloadAction<string>) => {
      state.wheelState[state.selectedWheel] = action.payload;
    },
  },
});

export const {
  drumBarChanged,
  resetAllLugs,
  bulkSetLugs,
  sortAllLugs,
  wheelSelected,
  selectedWheelPinsChanged,
} = m209Slice.actions;

// Selectors

export const selectDrumBarState = (state: RootState, barId: number) => {
  const index = barId - 1;
  if (index >= 0 && index < numBars) {
    return state.m209.drumState[index];
  }
  throw new RangeError(`barId of ${barId} not in range 1 - ${numBars}`);
};

export const selectDrumState = (state: RootState) => {
  return state.m209.drumState;
};

export const selectWheelState = (state: RootState, wheelId: number): string => {
  if (wheelId < 0 || wheelId >= numWheels) {
    throw new RangeError(`Invalid wheelId ${wheelId}`);
  }
  if (state.m209.wheelState[wheelId] === undefined) {
    throw new Error(`Programming error: no wheel state for wheelId ${wheelId}`);
  }
  return state.m209.wheelState[wheelId];
};

export const selectSelectedWheel = (state: RootState) => {
  return state.m209.selectedWheel;
};

export default m209Slice.reducer;
