import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type ReflectorType = "B" | "C" | "B-Thin" | "C-Thin" | null;

export type NotationType = "letter" | "number";

interface EnigmaState {
  activeSetupStep: number;
  numberOfRotors: number;
  reflector: ReflectorType;
  rotorTypes: string[];
  ringSettings: number[];
  ringSettingsNotation: NotationType;
}

// Define the initial state using that type
const initialState: EnigmaState = {
  activeSetupStep: 0,
  numberOfRotors: 3,
  reflector: null,
  rotorTypes: new Array(3).fill(null),
  ringSettings: new Array(3).fill(null),
  ringSettingsNotation: "number",
};

export type RotorTypeChangedPayload = {
  rotorType: string;
  position: number;
};

export type RingSettingChangedPayload = {
  ringSetting: number;
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
      state.ringSettings = new Array(state.numberOfRotors).fill(null);
      state.ringSettingsNotation =
        state.numberOfRotors === 3 ? "number" : "letter";
    },
    reflectorChanged: (state, action: PayloadAction<ReflectorType>) => {
      state.reflector = action.payload;
    },
    rotorTypeChanged: (
      state,
      action: PayloadAction<RotorTypeChangedPayload>,
    ) => {
      const newRotorType = action.payload.rotorType;

      const rotorTypes = new Array(state.numberOfRotors);
      for (let i = 0; i < state.numberOfRotors; ++i) {
        // We can't reuse rotors, there is only 1 of each type in the box.
        rotorTypes[i] =
          newRotorType != state.rotorTypes[i] ? state.rotorTypes[i] : null;
      }
      rotorTypes[action.payload.position] = action.payload.rotorType;
      state.rotorTypes = rotorTypes;
    },
    ringSettingChanged: (
      state,
      action: PayloadAction<RingSettingChangedPayload>,
    ) => {
      const newRingSetting = action.payload.ringSetting;
      const ringSettings = new Array(state.numberOfRotors);
      for (let i = 0; i < state.numberOfRotors; ++i) {
        ringSettings[i] = state.ringSettings[i];
      }
      ringSettings[action.payload.position] = newRingSetting;
      state.ringSettings = ringSettings;
    },
    ringSettingsNotationChanged: (
      state,
      action: PayloadAction<NotationType>,
    ) => {
      state.ringSettingsNotation = action.payload;
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
  ringSettingChanged,
  ringSettingsNotationChanged,
} = enigmaSlice.actions;

// Selectors

export const selectActiveSetupStep = (state: RootState) =>
  state.enigma.activeSetupStep;

export const selectStep1Complete = (state: RootState) =>
  state.enigma.numberOfRotors !== null;

export const selectStep2Complete = (state: RootState) =>
  state.enigma.rotorTypes.every((r) => r !== null);

export const selectStep3Complete = (state: RootState) =>
  state.enigma.ringSettings.every((r) => r !== null);

export const selectStepCompletionStatus = createSelector(
  selectStep1Complete,
  selectStep2Complete,
  selectStep3Complete,
  (step1, step2, step3) => {
    return [step1, step2, step3, false];
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

export const selectRingSettingForRotor = (state: RootState, rotor: number) =>
  state.enigma.ringSettings[rotor];

export const selectRingSettingsNotation = (state: RootState) =>
  state.enigma.ringSettingsNotation;

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
