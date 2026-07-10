import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../app/setupStore.ts";
import type { EnigmaConfig } from "../enigma/config/enigmaConfig.ts";
import { configLoaded as enigmaConfigLoaded } from "../enigma/enigmaSlice.ts";
import type { M209Config } from "../m209/config/m209Config.ts";
import { configLoaded as m209ConfigLoaded } from "../m209/m209Slice.ts";
import type { PurpleConfig } from "../purple/config/purpleConfig.ts";
import { configLoaded as purpleConfigLoaded } from "../purple/purpleSlice.ts";
import {
  configSaved,
  loadConfigInitiated,
  saveConfigInitiated,
  selectConfigById,
} from "./configSlice.ts";
import ConfigStorage from "./configStorage.ts";

export const configMiddleware: Middleware<object, RootState> =
  (storeApi) => (next) => (action) => {
    if (loadConfigInitiated.match(action)) {
      const config = selectConfigById(storeApi.getState(), action.payload);
      if (!config) return;

      if (config.type === "enigma") {
        storeApi.dispatch(enigmaConfigLoaded(config));
      } else if (config.type === "m209") {
        storeApi.dispatch(m209ConfigLoaded(config));
      } else if (config.type === "purple") {
        storeApi.dispatch(purpleConfigLoaded(config));
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
        ConfigStorage.saveConfig(newConfig);
        storeApi.dispatch(configSaved(newConfig));
      } else if (action.payload.machineType === "m209") {
        const state = storeApi.getState().m209;
        const newConfig: M209Config = {
          type: "m209",
          id: self.crypto.randomUUID(),
          name: action.payload.name,
          createdAt: new Date().toISOString(),
          drumState: state.drumState,
          wheelState: state.wheelState,
        };
        ConfigStorage.saveConfig(newConfig);
        storeApi.dispatch(configSaved(newConfig));
      } else if (action.payload.machineType === "purple") {
        const state = storeApi.getState().purple;
        const newConfig: PurpleConfig = {
          type: "purple",
          id: self.crypto.randomUUID(),
          name: action.payload.name,
          createdAt: new Date().toISOString(),
          plugboard: state.plugboard,
          switchOrder: state.switchOrder,
        };
        ConfigStorage.saveConfig(newConfig);
        storeApi.dispatch(configSaved(newConfig));
      }
    }
    return next(action);
  };
