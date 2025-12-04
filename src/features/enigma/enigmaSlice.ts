import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type ReflectorType = "B" | "C" | "B-Thin" | "C-Thin" | null;

interface EnigmaState {
  numberOfRotors: number;
  reflector: ReflectorType;
  rotorTypes: string[];
}

// Define the initial state using that type
const initialState: EnigmaState = {
  numberOfRotors: 3,
  reflector: null,
  rotorTypes: new Array(3).fill(""),
};

export type SetRotorPayload = {
  rotorType: string;
  position: number;
};

export const enigmaSlice = createSlice({
  name: "enigma",
  initialState,
  reducers: {
    setNumberOfRotors: (state, action: PayloadAction<number>) => {
      state.numberOfRotors = action.payload;
      state.reflector = null;
      state.rotorTypes = new Array(state.numberOfRotors).fill(null);
    },
    setReflector: (state, action: PayloadAction<ReflectorType>) => {
      state.reflector = action.payload;
    },
    setRotorType: (state, action: PayloadAction<SetRotorPayload>) => {
      const rotorTypes = new Array(state.numberOfRotors);
      for (let i = 0; i < state.numberOfRotors; i++) {
        rotorTypes[i] = state.rotorTypes[i];
      }
      rotorTypes[action.payload.position] = action.payload.rotorType;
      state.rotorTypes = rotorTypes;
    },
  },
});

// Actions
export const { setNumberOfRotors, setReflector, setRotorType } =
  enigmaSlice.actions;

// Selectors
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

export const selectRotorTypes = (state: RootState) => state.enigma.rotorTypes;

export const selectRotorTypeChoices = (state: RootState) => {
  if (state.enigma.numberOfRotors === 3) {
    return threeRotorChoices;
  }
  return fourRotorChoices;
};

export default enigmaSlice.reducer;

const threeRotorChoices = [
  ["I", "II", "III", "IV", "V"],
  ["I", "II", "III", "IV", "V"],
  ["I", "II", "III", "IV", "V"],
];

const fourRotorChoices = [
  ["Beta", "Gamma"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
];
