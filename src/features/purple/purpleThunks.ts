import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../app/setupStore.ts";
import type { StoreDependencies } from "../../app/storeDependencies.ts";
import { playClickSound } from "../common/actions.ts";

export interface MachineUpdate {
  switchPositions: number[];
  outputText: string;
}

export const machineUpdate = createAction<MachineUpdate>(
  "purple/machineUpdate",
);
//const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const processInputText = createAsyncThunk<
  MachineUpdate,
  void,
  { state: RootState; dispatch: AppDispatch; extra: StoreDependencies }
>("purple/processInputText", (_, { getState, dispatch, extra: { Purple } }) => {
  const state = getState().purple;
  const machine = new Purple({
    switchPositions: state.switchPositions,
    switchOrder: state.switchOrder,
    plugboard: state.plugboard,
    mode: state.mode,
  });
  const output = machine.processText(state.inputText);
  dispatch(playClickSound());
  return { switchPositions: machine.switchPositions(), outputText: output };
});
