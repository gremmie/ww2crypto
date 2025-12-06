import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type ReflectorType = "B" | "C" | "B-Thin" | "C-Thin" | null;

interface EnigmaState {
  activeSetupStep: number;
  numberOfRotors: number;
  reflector: ReflectorType;
  rotorTypes: string[];
}

// Define the initial state using that type
const initialState: EnigmaState = {
  activeSetupStep: 0,
  numberOfRotors: 3,
  reflector: null,
  rotorTypes: new Array(3).fill(null),
};

export type SetRotorPayload = {
  rotorType: string;
  position: number;
};

export const enigmaSlice = createSlice({
  name: "enigma",
  initialState,
  reducers: {
    setupStepChanged: (state, action: PayloadAction<number>) => {
      state.activeSetupStep = action.payload;
    },
    setupStepAdvanced: (state) => {
      if (state.activeSetupStep < setupStepNames.length - 1) {
        state.activeSetupStep = state.activeSetupStep + 1;
      }
    },
    setupStepReversed: (state) => {
      if (state.activeSetupStep > 0) {
        state.activeSetupStep = state.activeSetupStep - 1;
      }
    },
    modelChanged: (state, action: PayloadAction<number>) => {
      state.numberOfRotors = action.payload;
      state.reflector = null;
      state.rotorTypes = new Array(state.numberOfRotors).fill(null);
    },
    reflectorChanged: (state, action: PayloadAction<ReflectorType>) => {
      state.reflector = action.payload;
    },
    rotorTypeChanged: (state, action: PayloadAction<SetRotorPayload>) => {
      const newRotorType = action.payload.rotorType;

      const rotorTypes = new Array(state.numberOfRotors);
      for (let i = 0; i < state.numberOfRotors; i++) {
        // We can't reuse rotors, there is only 1 of each type in the box.
        rotorTypes[i] =
          newRotorType != state.rotorTypes[i] ? state.rotorTypes[i] : null;
      }
      rotorTypes[action.payload.position] = action.payload.rotorType;
      state.rotorTypes = rotorTypes;
    },
  },
});

// Actions
export const {
  setupStepChanged,
  setupStepAdvanced,
  setupStepReversed,
  modelChanged,
  reflectorChanged,
  rotorTypeChanged,
} = enigmaSlice.actions;

// Selectors

export const selectActiveSetupStep = (state: RootState) =>
  state.enigma.activeSetupStep;

export const selectStep1Complete = (state: RootState) =>
  state.enigma.numberOfRotors !== null;

export const selectStep2Complete = (state: RootState) =>
  state.enigma.rotorTypes.every((r) => r !== null);

export const selectStepCompletionStatus = createSelector(
  selectStep1Complete,
  selectStep2Complete,
  (step1, step2) => {
    return [step1, step2, false, false];
  },
);

export const selectNumberOfRotors = (state: RootState) =>
  state.enigma.numberOfRotors;

export const selectReflector = (state: RootState) => state.enigma.reflector;

export const selectReflectorChoices = createSelector(
  selectNumberOfRotors,
  (numRotors: number) => {
    switch (numRotors) {
      case 3: {
        return ["B", "C"];
      }
      case 4: {
        return ["B-Thin", "C-Thin"];
      }
      default: {
        return [];
      }
    }
  },
);

export const selectRotorTypeForRotor = (state: RootState, rotor: number) =>
  state.enigma.rotorTypes[rotor];

export const selectRotorTypeChoicesForRotor = (
  state: RootState,
  rotor: number,
) => {
  if (state.enigma.numberOfRotors === 3) {
    return threeRotorChoices[rotor];
  }
  return fourRotorChoices[rotor];
};

export default enigmaSlice.reducer;

export const setupStepNames = [
  "Model",
  "Reflector & Rotors",
  "Ring Settings",
  "Plugboard",
];

const threeRotorChoices = [
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
];

const fourRotorChoices = [
  ["Beta", "Gamma"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
];
