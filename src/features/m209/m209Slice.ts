import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";
import { modulo } from "../common/utils.ts";
import type { M209Config } from "./config/m209Config.ts";
import type { ModeType } from "./machine/m209.ts";
import { KEY_WHEEL_DATA } from "./machine/wheelData.ts";
import { sortDrumState } from "./utils.ts";

const numBars = 27;
const numWheels = 6;

export interface M209State {
  drumState: [number, number][];
  wheelState: string[];
  selectedWheel: number;
  wheelPositions: number[];
  mode: ModeType;
  counter: number;
}

const initialState: M209State = {
  drumState: Array.from({ length: numBars }, () => [0, 0]),
  wheelState: Array.from({ length: numWheels }, () => ""),
  selectedWheel: 0,
  wheelPositions: Array.from({ length: numWheels }, () => 0),
  mode: "cipher",
  counter: 0,
};

export interface DrumBarChangedPayload {
  // 1-based bar number (1-27)
  barId: number;
  newState: [number, number];
}

export interface WheelLetterChangedPayload {
  wheelId: number;
  letter: string;
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
      const deduplicatedPins = new Set(action.payload.toUpperCase());
      state.wheelState[state.selectedWheel] = Array.from(deduplicatedPins)
        .toSorted()
        .join("");
    },
    selectedWheelPositionChanged: (state, action: PayloadAction<number>) => {
      state.wheelPositions[state.selectedWheel] = action.payload;
    },
    configLoaded: (state, action: PayloadAction<M209Config>) => {
      state.drumState = action.payload.drumState;
      state.wheelState = action.payload.wheelState;
    },
    wheelAdvanced: (state, action: PayloadAction<number>) => {
      const wheelId = action.payload;
      checkWheelId(wheelId);
      const numLetters = KEY_WHEEL_DATA[wheelId]!.letters.length;
      const curPos = state.wheelPositions[wheelId]!;
      state.wheelPositions[wheelId] = modulo(curPos + 1, numLetters);
    },
    wheelReversed: (state, action: PayloadAction<number>) => {
      const wheelId = action.payload;
      checkWheelId(wheelId);
      const numLetters = KEY_WHEEL_DATA[wheelId]!.letters.length;
      const curPos = state.wheelPositions[wheelId]!;
      state.wheelPositions[wheelId] = modulo(curPos - 1, numLetters);
    },
    wheelLetterChanged: (
      state,
      action: PayloadAction<WheelLetterChangedPayload>,
    ) => {
      const { wheelId, letter } = action.payload;
      checkWheelId(wheelId);
      const validChoices = KEY_WHEEL_DATA[wheelId]!.letters;
      const newPos = validChoices.indexOf(letter.toUpperCase());
      if (newPos !== -1) {
        state.wheelPositions[wheelId] = newPos;
      }
    },
    toggleMode: (state) => {
      state.mode = state.mode === "cipher" ? "decipher" : "cipher";
    },
  },
});

const checkWheelId = (id: number): void => {
  if (id < 0 || id >= numWheels) {
    throw new RangeError(`Invalid wheel id ${id}`);
  }
};

export const {
  drumBarChanged,
  resetAllLugs,
  bulkSetLugs,
  sortAllLugs,
  wheelSelected,
  selectedWheelPinsChanged,
  selectedWheelPositionChanged,
  configLoaded,
  wheelAdvanced,
  wheelReversed,
  wheelLetterChanged,
  toggleMode,
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

export const selectSelectedWheelState = (state: RootState): string => {
  const wheelState = state.m209.wheelState[state.m209.selectedWheel];
  if (wheelState === undefined) {
    throw new Error(
      `Programming error: no wheel state for selected wheelId ${state.m209.selectedWheel}`,
    );
  }
  return wheelState;
};

export const selectSelectedWheel = (state: RootState) => {
  return state.m209.selectedWheel;
};

export const selectSelectedWheelPosition = (state: RootState) => {
  const position = state.m209.wheelPositions[state.m209.selectedWheel];
  if (position !== undefined) return position;
  throw new Error(
    `Programming error: no wheel position for wheelId ${state.m209.selectedWheel}`,
  );
};

export const selectWheelLetter = (
  state: RootState,
  wheelId: number,
): string => {
  if (wheelId < 0 || wheelId >= numWheels) {
    throw new RangeError(`Invalid wheelId ${wheelId}`);
  }
  const wheelPos = state.m209.wheelPositions[wheelId]!;
  return KEY_WHEEL_DATA[wheelId]!.letters[wheelPos]!;
};

export const selectMode = (state: RootState): ModeType => {
  return state.m209.mode;
};

export const selectCounter = (state: RootState): number => {
  return state.m209.counter;
};

export default m209Slice.reducer;
