import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import ConfigStorage from "../config/configStorage.ts";
import type { MachineConfig } from "../config/machineConfig.ts";
import { configNameSaved } from "../enigmaSlice";

export const storageMiddleware: Middleware<object, RootState> =
  (storeApi) => (next) => (action) => {
    // Use the action creator's .match() method as a type guard
    if (configNameSaved.match(action)) {
      const state = storeApi.getState().enigma;

      const config: MachineConfig = {
        name: action.payload,
        createdAt: new Date().toISOString(),
        reflector: state.reflector as string,
        rotors: state.rotorTypes,
        rings: state.ringSettings,
        ringNotation: state.ringSettingsNotation,
        plugboard: state.plugboard,
        plugboardNotation: state.plugboardNotation,
      };

      ConfigStorage.saveConfig(config);
    }

    return next(action);
  };
