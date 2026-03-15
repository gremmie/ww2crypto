import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { applicationStarted } from "../../common/actions.ts";
import type { MachineConfig } from "../../common/config/machineConfig.ts";

export const storageMiddleware: Middleware<object, RootState> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_storeApi) => (next) => (action) => {
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
    }

    return next(action);
  };
