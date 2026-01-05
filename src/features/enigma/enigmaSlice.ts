import type { PayloadAction, WritableDraft } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import EnigmaMachine from "./machine/EnigmaMachine.ts";
import Plugboard from "./machine/Plugboard.ts";
import reflectorFactory from "./machine/reflectorFactory.ts";
import Rotor from "./machine/Rotor.ts";
import rotorFactory from "./machine/rotorFactory.ts";
import { isValidPlugboardString, normalizePlugboardString } from "./utils.ts";

export type TabType = "setup" | "operate";

export type ReflectorType = "B" | "C" | "B-Thin" | "C-Thin" | null;

export type NotationType = "letter" | "number";

export interface EnigmaState {
  currentTab: TabType;
  activeSetupStep: number;
  numberOfRotors: number;
  reflector: ReflectorType;
  rotorTypes: string[];
  ringSettings: number[];
  ringSettingsNotation: NotationType;
  plugboard: string;
  plugboardNotation: NotationType;
  plugboardCableCount: number;
  rotorDisplays: string[];
  inputText: string;
  outputText: string;
  activeLamp: string;
}

// Define the initial state using that type
const initialState: EnigmaState = {
  currentTab: "setup",
  activeSetupStep: 0,
  numberOfRotors: 3,
  reflector: null,
  rotorTypes: new Array(3).fill(null),
  ringSettings: new Array(3).fill(null),
  ringSettingsNotation: "number",
  plugboard: "",
  plugboardNotation: "letter",
  plugboardCableCount: 10,
  rotorDisplays: ["A", "A", "A"],
  inputText: "",
  outputText: "",
  activeLamp: "",
};

export type RotorTypeChangedPayload = {
  rotorType: string;
  position: number;
};

export type RingSettingChangedPayload = {
  ringSetting: number;
  position: number;
};

export type RotorDisplayChangedPayload = {
  index: number;
  value: string;
};

export const enigmaSlice = createSlice({
  name: "enigma",
  initialState,
  reducers: {
    currentTabChanged: (state, action: PayloadAction<TabType>) => {
      state.currentTab = action.payload;
    },
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
      state.plugboard = "";
      state.plugboardNotation = state.numberOfRotors == 3 ? "letter" : "number";
      state.plugboardCableCount = 10;
      state.rotorDisplays = new Array(state.numberOfRotors).fill("A");
      state.inputText = "";
      state.outputText = "";
    },
    reflectorChanged: (state, action: PayloadAction<ReflectorType>) => {
      state.reflector = action.payload;
      state.inputText = "";
      state.outputText = "";
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
      state.inputText = "";
      state.outputText = "";
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
      state.inputText = "";
      state.outputText = "";
    },
    ringSettingsNotationChanged: (
      state,
      action: PayloadAction<NotationType>,
    ) => {
      state.ringSettingsNotation = action.payload;
    },
    plugboardBulkSet: (state, action: PayloadAction<string>) => {
      const s = action.payload;
      if (s === "" || isValidPlugboardString(s, state.plugboardCableCount)) {
        state.plugboard = normalizePlugboardString(s);
      }
      state.inputText = "";
      state.outputText = "";
    },
    plugboardConnected: (state, action: PayloadAction<string>) => {
      if (!isConnection(action.payload)) return;

      const newConnection = action.payload.toUpperCase().split("").sort();
      const connections =
        state.plugboard === "" ? [] : state.plugboard.split(" ");
      if (
        connections.every(
          (c) => !c.includes(newConnection[0]) && !c.includes(newConnection[1]),
        )
      ) {
        connections.push(newConnection.join(""));
        state.plugboard = connections.sort().join(" ");
        state.inputText = "";
        state.outputText = "";
      }
    },
    plugboardDisconnected: (state, action: PayloadAction<string>) => {
      if (!isConnection(action.payload)) return;

      const oldConnection = action.payload
        .toUpperCase()
        .split("")
        .sort()
        .join("");
      const connections = state.plugboard.split(" ");
      if (connections.includes(oldConnection)) {
        state.plugboard = connections
          .filter((c) => c !== oldConnection)
          .join(" ");
        state.inputText = "";
        state.outputText = "";
      }
    },
    plugboardNotationChanged: (state, action: PayloadAction<NotationType>) => {
      state.plugboardNotation = action.payload;
    },
    plugboardCableCountChanged: (state, action: PayloadAction<number>) => {
      const newCount = action.payload;
      if (newCount < 0 || newCount > 13) return;

      state.plugboardCableCount = newCount;
      const connections =
        state.plugboard === "" ? [] : state.plugboard.split(" ");
      if (connections.length > newCount) {
        connections.length = newCount;
        state.plugboard = connections.join(" ");
      }
    },
    rotorDisplayChanged: (
      state,
      action: PayloadAction<RotorDisplayChangedPayload>,
    ) => {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.numberOfRotors ||
        !/^[A-Z]$/.test(action.payload.value)
      ) {
        return;
      }
      state.rotorDisplays[action.payload.index] = action.payload.value;
    },
    operatorKeyPressed: (state, action: PayloadAction<string>) => {
      if (!/^[A-Z]$/.test(action.payload)) return;
      const machine = createMachine(state);
      if (machine === null) return;

      state.inputText += action.payload;
      const output = machine.keyPress(action.payload);
      state.outputText += output;
      state.activeLamp = output;

      const newRotorDisplay = machine.getDisplay();
      for (let i = 0; i < newRotorDisplay.length; ++i) {
        state.rotorDisplays[i] = newRotorDisplay[i];
      }
    },
    operatorKeyReleased: (state) => {
      state.activeLamp = "";
    },
    operatorPastedText: (state, action: PayloadAction<string>) => {
      const machine = createMachine(state);
      if (machine === null) return;

      state.inputText += action.payload;
      state.outputText += machine.processText(action.payload);

      const newRotorDisplay = machine.getDisplay();
      for (let i = 0; i < newRotorDisplay.length; ++i) {
        state.rotorDisplays[i] = newRotorDisplay[i];
      }
    },
    operatorClearedInput: (state) => {
      state.inputText = "";
    },
    operatorClearedOutput: (state) => {
      state.outputText = "";
    },
  },
});

// Actions
export const {
  currentTabChanged,
  setupStepChanged,
  setupStepAdvanced,
  setupStepReversed,
  modelChanged,
  reflectorChanged,
  rotorTypeChanged,
  ringSettingChanged,
  ringSettingsNotationChanged,
  plugboardBulkSet,
  plugboardConnected,
  plugboardDisconnected,
  plugboardNotationChanged,
  plugboardCableCountChanged,
  rotorDisplayChanged,
  operatorKeyPressed,
  operatorKeyReleased,
  operatorPastedText,
  operatorClearedInput,
  operatorClearedOutput,
} = enigmaSlice.actions;

// Selectors

export const selectCurrentTab = (state: RootState) => state.enigma.currentTab;

export const selectActiveSetupStep = (state: RootState) =>
  state.enigma.activeSetupStep;

export const selectStep1Complete = (state: RootState) =>
  state.enigma.numberOfRotors !== null;

export const selectStep2Complete = (state: RootState) =>
  state.enigma.rotorTypes.every((r) => r !== null);

export const selectStep3Complete = (state: RootState) =>
  state.enigma.ringSettings.every((r) => r !== null);

export const selectStep4Complete = (state: RootState) => {
  const connections =
    state.enigma.plugboard === "" ? [] : state.enigma.plugboard.split(" ");
  return connections.length === state.enigma.plugboardCableCount;
};

export const selectStepCompletionStatus = createSelector(
  selectStep1Complete,
  selectStep2Complete,
  selectStep3Complete,
  selectStep4Complete,
  (step1, step2, step3, step4) => [step1, step2, step3, step4],
);

export const selectIsSetupComplete = (state: RootState) =>
  selectStep1Complete(state) &&
  selectStep2Complete(state) &&
  selectStep3Complete(state) &&
  selectStep4Complete(state);

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

export const selectPlugboard = (state: RootState) => state.enigma.plugboard;

export const selectPlugboardNotation = (state: RootState) =>
  state.enigma.plugboardNotation;

export const selectPlugboardCableCount = (state: RootState) =>
  state.enigma.plugboardCableCount;

export const selectRotorWindow = (state: RootState, index: number) => {
  if (index < 0 || index >= state.enigma.rotorDisplays.length) {
    return null;
  }
  return state.enigma.rotorDisplays[index];
};

export const selectInputText = (state: RootState) => state.enigma.inputText;

export const selectOutputText = (state: RootState) => state.enigma.outputText;

export const selectActiveLamp = (state: RootState) => state.enigma.activeLamp;

export default enigmaSlice.reducer;

export const setupStepNames = [
  "Model",
  "Reflector & Rotors",
  "Ring Settings",
  "Plugboard",
];

const isConnection = (s: string) => /[a-zA-Z]{2}/.test(s);

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

function createMachine(state: WritableDraft<EnigmaState>) {
  if (state.reflector === null) return null;
  if (!state.rotorTypes.every((type) => type !== null)) return null;
  if (!state.ringSettings.every((n) => n !== null)) return null;

  const plugboard = new Plugboard(state.plugboard);
  const reflector = reflectorFactory(state.reflector)!;

  const rotors: Rotor[] = [];
  for (let i = 0; i < state.numberOfRotors; ++i) {
    rotors.push(rotorFactory(state.rotorTypes[i], state.ringSettings[i])!);
  }
  const machine = new EnigmaMachine(reflector, rotors, plugboard);
  machine.setDisplay(state.rotorDisplays.join(""));
  return machine;
}
