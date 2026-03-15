import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";
import type { EnigmaConfig } from "../enigma/config/enigmaConfig.ts";
import { configLoaded } from "../enigma/enigmaSlice.ts";
import {
  configSaved,
  loadConfigInitiated,
  saveConfigInitiated,
  selectConfigById,
} from "./configSlice.ts";
import ConfigStorage2 from "./configStorage2.ts";

export const configMiddleware: Middleware<object, RootState> =
  (storeApi) => (next) => (action) => {
    if (loadConfigInitiated.match(action)) {
      const config = selectConfigById(storeApi.getState(), action.payload);
      if (config.type === "enigma") {
        storeApi.dispatch(configLoaded(config));
      }
    }
    if (saveConfigInitiated.match(action)) {
      if (action.payload.machineType === "enigma") {
        const state = storeApi.getState().enigma;
        const newConfig: EnigmaConfig = {
          type: "enigma",
          id: self.crypto.randomUUID(),
          name: action.payload.name,
          createdAt: new Date().toISOString(),
          reflector: state.reflector as string,
          rotors: state.rotorTypes,
          rings: state.ringSettings,
          ringNotation: state.ringSettingsNotation,
          plugboard: state.plugboard,
          plugboardNotation: state.plugboardNotation,
        };
        ConfigStorage2.saveConfig(newConfig);
        storeApi.dispatch(configSaved(newConfig));
      }
    }
    return next(action);
  };
