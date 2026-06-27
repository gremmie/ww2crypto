import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../app/setupStore.ts";
import type { StoreDependencies } from "../../app/storeDependencies.ts";
import { playClickSound } from "../common/actions.ts";
import { machineUpdate, operatorKeyReleased } from "./enigmaSlice.ts";
import type { EnigmaMachine } from "./machine/enigmaMachine.ts";
import Plugboard from "./machine/plugboard.ts";
import reflectorFactory from "./machine/reflectorFactory.ts";
import Rotor from "./machine/rotor.ts";
import rotorFactory from "./machine/rotorFactory.ts";

type EnigmaCtor = typeof EnigmaMachine;

export const operatorKeyPressed = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
    extra: StoreDependencies;
    rejectValue: undefined;
  }
>("enigma/operatorKeyPressed", async (key, thunkApi) => {
  if (!/^[A-Z]$/.test(key)) return;
  const dispatch = thunkApi.dispatch;
  const machine = buildEnigmaFromState(
    thunkApi.getState().enigma,
    thunkApi.extra.EnigmaMachine,
  );
  if (!machine) return;

  const output = machine.keyPress(key);

  dispatch(playClickSound());
  dispatch(
    machineUpdate({
      input: key,
      output: output,
      display: machine.getDisplay(),
    }),
  );
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const operatorSentBulkText = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
    extra: StoreDependencies;
    rejectValue: undefined;
  }
>("enigma/operatorSentBulkText", async (text: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  const isLampPanelOpen = thunkApi.getState().enigma.isLampPanelOpen;

  const machine = buildEnigmaFromState(
    thunkApi.getState().enigma,
    thunkApi.extra.EnigmaMachine,
  );
  if (!machine) return;

  if (!isLampPanelOpen) {
    const output = machine.processText(text);
    dispatch(playClickSound());
    dispatch(
      machineUpdate({
        input: text,
        output: output,
        display: machine.getDisplay(),
      }),
    );
    return;
  }

  for (const c of text) {
    await sleep(100);
    const output = machine.keyPress(c);
    dispatch(playClickSound());
    dispatch(
      machineUpdate({
        input: c,
        output: output,
        display: machine.getDisplay(),
      }),
    );
    await sleep(250);
    dispatch(operatorKeyReleased());
  }
});

const buildEnigmaFromState = (
  state: RootState["enigma"],
  EnigmaMachine: EnigmaCtor,
) => {
  if (state.reflector === null) return null;
  if (!state.rotorTypes.every((type) => type !== null)) return null;
  if (!state.ringSettings.every((n) => n !== null)) return null;

  const plugboard = new Plugboard(state.plugboard);
  const reflector = reflectorFactory(state.reflector)!;

  const rotors: Rotor[] = [];
  for (let i = 0; i < state.numberOfRotors; ++i) {
    rotors.push(rotorFactory(state.rotorTypes[i]!, state.ringSettings[i])!);
  }
  const machine = new EnigmaMachine(reflector, rotors, plugboard);
  machine.setDisplay(state.rotorDisplays.join(""));
  return machine;
};
