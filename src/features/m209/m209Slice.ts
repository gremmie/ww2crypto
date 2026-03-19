import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";

const numBars = 27;

export interface M209State {
  drumState: [number, number][];
}

const initialState: M209State = {
  drumState: Array.from({ length: numBars }, () => [0, 0]),
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
  },
});

export const { drumBarChanged } = m209Slice.actions;

// Selectors

export const selectDrumBarState = (state: RootState, barId: number) => {
  const index = barId - 1;
  if (index >= 0 && index < numBars) {
    return state.m209.drumState[index];
  }
  throw new RangeError(`barId of ${barId} not in range 1 - ${numBars}`);
};

export default m209Slice.reducer;
