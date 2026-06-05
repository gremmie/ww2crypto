import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../app/setupStore.ts";
import type { StoreDependencies } from "../../app/storeDependencies.ts";
import type { M209 } from "./machine/m209.ts";

type M209Constructor = typeof M209;

export const mainAxleRotated = createAsyncThunk<
  M209,
  number,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>("m209/mainAxleRotated", async (count, { getState, extra: { M209 } }) => {
  const m209 = buildM209FromState(getState().m209, M209);
  m209.rotateMainAxle(count);
  return m209;
});

export const resetCounter = createAsyncThunk<
  M209,
  void,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>("m209/resetLetterCounter", async (_, { getState, extra: { M209 } }) => {
  const m209 = buildM209FromState(getState().m209, M209);
  m209.resetLetterCounter();
  return m209;
});

export const convertInputText = createAsyncThunk<
  [string, M209],
  void,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>("m209/convertInputText", async (_, { getState, extra: { M209 } }) => {
  const state = getState().m209;
  const m209 = buildM209FromState(state, M209);
  const output = m209.convert(state.inputText);
  return [output, m209];
});

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
