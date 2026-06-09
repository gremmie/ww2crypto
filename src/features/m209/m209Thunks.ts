import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../app/setupStore.ts";
import type { StoreDependencies } from "../../app/storeDependencies.ts";
import { playClickSound } from "../common/actions.ts";
import type { M209 } from "./machine/m209.ts";

type M209Constructor = typeof M209;

export interface MachineUpdate {
  wheels: number[];
  counter: number;
  outputText?: string;
}

export const machineUpdate = createAction<MachineUpdate>("m209/machineUpdate");
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mainAxleRotated = createAsyncThunk<
  MachineUpdate,
  number,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>(
  "m209/mainAxleRotated",
  async (count, { getState, dispatch, extra: { M209 } }) => {
    const m209 = buildM209FromState(getState().m209, M209);
    m209.rotateMainAxle(count);
    dispatch(playClickSound());
    return { wheels: m209.wheelPositions(), counter: m209.letterCount };
  },
);

export const resetCounter = createAsyncThunk<
  MachineUpdate,
  void,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>(
  "m209/resetLetterCounter",
  async (_, { getState, dispatch, extra: { M209 } }) => {
    const m209 = buildM209FromState(getState().m209, M209);
    m209.resetLetterCounter();
    dispatch(playClickSound());
    return { wheels: m209.wheelPositions(), counter: m209.letterCount };
  },
);

export const convertInputText = createAsyncThunk<
  MachineUpdate,
  void,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>(
  "m209/convertInputText",
  async (_, { getState, dispatch, extra: { M209 } }) => {
    const state = getState().m209;
    const m209 = buildM209FromState(state, M209);
    const output = m209.convert(state.inputText);
    dispatch(playClickSound());
    return {
      wheels: m209.wheelPositions(),
      counter: m209.letterCount,
      outputText: output,
    };
  },
);

export const convertInputTextWithAnimation = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>(
  "m209/convertInputTextWithAnimation",
  async (_, { getState, dispatch, extra: { M209 } }) => {
    const state = getState().m209;
    const m209 = buildM209FromState(state, M209);
    for (const c of state.inputText) {
      const output = m209.convert(c);
      dispatch(playClickSound());
      dispatch(
        machineUpdate({
          wheels: m209.wheelPositions(),
          counter: m209.letterCount,
          outputText: output,
        }),
      );
      await sleep(400);
    }
  },
);

const buildM209FromState = (
  state: RootState["m209"],
  M209: M209Constructor,
) => {
  return M209.factory({
    bars: state.drumState,
    pinList: state.wheelState,
    counter: state.counter,
    initialPositions: state.wheelPositions,
    mode: state.mode,
  });
};
