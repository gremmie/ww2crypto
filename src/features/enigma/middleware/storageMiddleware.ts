import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { applicationStarted } from "../../common/actions.ts";
import type { MachineConfig } from "../../common/config/machineConfig.ts";
import ConfigStorage from "../../config/configStorage.ts";
import type { EnigmaConfig } from "../config/enigmaConfig.ts";
import { configNameSaved } from "../enigmaSlice";

export const storageMiddleware: Middleware<object, RootState> =
  (storeApi) => (next) => (action) => {
    if (applicationStarted.match(action)) {
      // Migrate Enigma configs if they already exist.
      const enigmaConfigStr = localStorage.getItem("ww2crypto-enigma");
      if (enigmaConfigStr !== null) {
        const entries = JSON.parse(enigmaConfigStr) as [
          string,
          MachineConfig,
        ][];
        // Enigma configs didn't always have a type field. Fix that up.
        const migratedEntries: MachineConfig[] = entries.map(([, config]) => {
          const uuid = self.crypto.randomUUID();
          return {
            ...config,
            type: "enigma",
            id: uuid,
          };
        });
        localStorage.setItem(
          "ww2crypto-configs",
          JSON.stringify(migratedEntries),
        );
        //localStorage.removeItem("ww2crypto-configs");
      }
    } else if (configNameSaved.match(action)) {
      const state = storeApi.getState().enigma;

      const config: EnigmaConfig = {
        type: "enigma",
        id: self.crypto.randomUUID(),
        name: action.payload,
        createdAt: new Date().toISOString(),
        reflector: state.reflector as string,
        rotors: state.rotorTypes,
        rings: state.ringSettings,
        ringNotation: state.ringSettingsNotation,
        plugboard: state.plugboard,
        plugboardNotation: state.plugboardNotation,
      };

      ConfigStorage.saveConfig("enigma", config);
    }

    return next(action);
  };
