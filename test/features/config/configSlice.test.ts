import { describe, expect, test } from "vitest";

import type { RootState } from "../../../src/app/setupStore.ts";
import { applicationStarted } from "../../../src/features/common/actions.ts";
import type { MachineConfig } from "../../../src/features/common/config/machineConfig.ts";
import type { MachineType } from "../../../src/features/common/config/machineType.ts";
import type { EnigmaConfig } from "../../../src/features/enigma/config/enigmaConfig.ts";
import { selectIsSetupComplete } from "../../../src/features/enigma/enigmaSlice.ts";
import type { M209Config } from "../../../src/features/m209/config/m209Config.ts";
import type { PurpleConfig } from "../../../src/features/purple/config/purpleConfig.ts";
import configReducer, {
  configSaved,
  configSlice,
  deleteConfigInitiated,
  loadConfigInitiated,
  saveConfigInitiated,
  undoDeleteConfigInitiated,
  selectActiveConfig,
  selectConfigById,
  selectConfigNamesByType,
  selectConfigsByType,
  selectIsActiveConfigModified,
  selectIsSetupCompleteForType,
  type ConfigState,
} from "../../../src/features/config/configSlice.ts";
import ConfigStorage from "../../../src/features/config/configStorage.ts";
import { setupTestStore } from "../../utils/test-utils.tsx";

// localStorage is a per-test mock installed in test/setup.ts.

const enigmaConfig: EnigmaConfig = {
  type: "enigma",
  id: "e1",
  name: "Enigma A",
  createdAt: "2026-07-10T00:00:00.000Z",
  reflector: "B",
  rotors: ["I", "II", "III"],
  rings: [1, 1, 1],
  ringNotation: "number",
  plugboard: "AB CD",
  plugboardNotation: "letter",
};

const enigmaConfig2: EnigmaConfig = {
  ...enigmaConfig,
  id: "e2",
  name: "Enigma B",
};

const m209Config: M209Config = {
  type: "m209",
  id: "m1",
  name: "M209 A",
  createdAt: "2026-07-10T00:00:00.000Z",
  drumState: [],
  wheelState: [],
};

const purpleConfig: PurpleConfig = {
  type: "purple",
  id: "p1",
  name: "Purple A",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "1-2-3",
};

// A full, valid default RootState we can spread and selectively override.
const baseState: RootState = setupTestStore().getState();

/** Build a normalized ConfigState from a flat list of configs. */
function makeConfigState(
  configs: MachineConfig[],
  loaded: Partial<Record<MachineType, string | null>> = {},
): ConfigState {
  return {
    configs: {
      ids: configs.map((c) => c.id),
      entities: Object.fromEntries(configs.map((c) => [c.id, c])),
    },
    loadedConfigs: { enigma: null, m209: null, purple: null, ...loaded },
  };
}

/** Build a RootState with the given config slice and optional machine overrides. */
function rootWith(over: Partial<RootState>): RootState {
  return { ...baseState, ...over };
}

describe("configSlice reducers", () => {
  describe("configSaved", () => {
    test("adds the config and marks it as the loaded config for its type", () => {
      const next = configReducer(
        configSlice.getInitialState(),
        configSaved(enigmaConfig),
      );
      expect(next.configs.entities[enigmaConfig.id]).toEqual(enigmaConfig);
      expect(next.loadedConfigs.enigma).toBe(enigmaConfig.id);
    });

    test("overwrites an existing config with the same id", () => {
      const start = makeConfigState([enigmaConfig]);
      const renamed = { ...enigmaConfig, name: "Renamed" };
      const next = configReducer(start, configSaved(renamed));
      expect(next.configs.ids).toEqual([enigmaConfig.id]);
      expect(next.configs.entities[enigmaConfig.id]?.name).toBe("Renamed");
    });
  });

  describe("loadConfigInitiated", () => {
    test("sets the loaded config for the config's type", () => {
      const start = makeConfigState([enigmaConfig]);
      const next = configReducer(start, loadConfigInitiated(enigmaConfig.id));
      expect(next.loadedConfigs.enigma).toBe(enigmaConfig.id);
    });

    test("is a no-op when the id is unknown", () => {
      const start = makeConfigState([enigmaConfig]);
      const next = configReducer(start, loadConfigInitiated("nope"));
      expect(next.loadedConfigs.enigma).toBeNull();
    });
  });

  describe("deleteConfigInitiated", () => {
    test("removes the config from state and storage", () => {
      ConfigStorage.saveConfig(enigmaConfig);
      const start = makeConfigState([enigmaConfig], {
        enigma: enigmaConfig.id,
      });

      const next = configReducer(start, deleteConfigInitiated(enigmaConfig.id));

      expect(next.configs.ids).not.toContain(enigmaConfig.id);
      expect(ConfigStorage.loadConfigs()).toEqual([]);
    });

    test("clears loadedConfigs only when the deleted config was active", () => {
      const start = makeConfigState([enigmaConfig], {
        enigma: enigmaConfig.id,
      });
      const next = configReducer(start, deleteConfigInitiated(enigmaConfig.id));
      expect(next.loadedConfigs.enigma).toBeNull();
    });

    test("leaves the active config untouched when deleting a different one", () => {
      const start = makeConfigState([enigmaConfig, enigmaConfig2], {
        enigma: enigmaConfig.id,
      });
      const next = configReducer(
        start,
        deleteConfigInitiated(enigmaConfig2.id),
      );
      expect(next.configs.ids).toEqual([enigmaConfig.id]);
      expect(next.loadedConfigs.enigma).toBe(enigmaConfig.id);
    });

    test("is a no-op when the id is unknown", () => {
      const start = makeConfigState([enigmaConfig], {
        enigma: enigmaConfig.id,
      });
      const next = configReducer(start, deleteConfigInitiated("nope"));
      expect(next.configs.ids).toEqual([enigmaConfig.id]);
      expect(next.loadedConfigs.enigma).toBe(enigmaConfig.id);
    });
  });

  describe("undoDeleteConfigInitiated", () => {
    test("re-adds the config to state and persists it to storage", () => {
      const store = setupTestStore({
        preloadedState: { config: makeConfigState([]) },
      });
      store.dispatch(undoDeleteConfigInitiated(m209Config));

      expect(store.getState().config.configs.entities[m209Config.id]).toEqual(
        m209Config,
      );
      expect(ConfigStorage.loadConfigs()).toEqual([m209Config]);
    });
  });

  describe("saveConfigInitiated", () => {
    test("does not mutate state (handled by configMiddleware)", () => {
      const start = makeConfigState([enigmaConfig], {
        enigma: enigmaConfig.id,
      });
      const next = configReducer(
        start,
        saveConfigInitiated({ name: "New", machineType: "enigma" }),
      );
      expect(next).toEqual(start);
    });
  });

  describe("applicationStarted", () => {
    test("hydrates the config entities from storage", () => {
      ConfigStorage.saveConfig(enigmaConfig);
      ConfigStorage.saveConfig(purpleConfig);

      const next = configReducer(
        configSlice.getInitialState(),
        applicationStarted(),
      );

      expect(next.configs.entities[enigmaConfig.id]).toEqual(enigmaConfig);
      expect(next.configs.entities[purpleConfig.id]).toEqual(purpleConfig);
    });
  });
});

describe("configSlice selectors", () => {
  const populated = rootWith({
    config: makeConfigState([enigmaConfig, enigmaConfig2, purpleConfig]),
  });

  describe("selectConfigById", () => {
    test("returns the matching config", () => {
      expect(selectConfigById(populated, enigmaConfig.id)).toEqual(
        enigmaConfig,
      );
    });

    test("returns undefined for an unknown id", () => {
      expect(selectConfigById(populated, "nope")).toBeUndefined();
    });
  });

  describe("selectConfigsByType", () => {
    test("returns only configs of the requested type", () => {
      expect(selectConfigsByType(populated, "enigma")).toEqual([
        enigmaConfig,
        enigmaConfig2,
      ]);
      expect(selectConfigsByType(populated, "purple")).toEqual([purpleConfig]);
      expect(selectConfigsByType(populated, "m209")).toEqual([]);
    });
  });

  describe("selectConfigNamesByType", () => {
    test("returns the names of configs of the requested type", () => {
      expect(selectConfigNamesByType(populated, "enigma")).toEqual([
        "Enigma A",
        "Enigma B",
      ]);
    });
  });

  describe("selectActiveConfig", () => {
    test("returns the loaded config for the type", () => {
      const state = rootWith({
        config: makeConfigState([enigmaConfig], { enigma: enigmaConfig.id }),
      });
      expect(selectActiveConfig(state, "enigma")).toEqual(enigmaConfig);
    });

    test("returns null when no config is loaded for the type", () => {
      expect(selectActiveConfig(populated, "enigma")).toBeNull();
    });
  });

  describe("selectIsSetupCompleteForType", () => {
    test("m209 and purple are always complete", () => {
      expect(selectIsSetupCompleteForType(baseState, "m209")).toBe(true);
      expect(selectIsSetupCompleteForType(baseState, "purple")).toBe(true);
    });

    test("enigma delegates to selectIsSetupComplete", () => {
      expect(selectIsSetupCompleteForType(baseState, "enigma")).toBe(
        selectIsSetupComplete(baseState),
      );
    });
  });

  describe("selectIsActiveConfigModified", () => {
    test("returns false when there is no active config", () => {
      expect(selectIsActiveConfigModified(populated, "enigma")).toBe(false);
    });

    describe("enigma", () => {
      const matchingEnigma: RootState["enigma"] = {
        ...baseState.enigma,
        reflector: "B",
        rotorTypes: ["I", "II", "III"],
        ringSettings: [1, 1, 1],
        ringSettingsNotation: "number",
        plugboard: "AB CD",
        plugboardNotation: "letter",
      };

      const stateWith = (enigma: RootState["enigma"]) =>
        rootWith({
          config: makeConfigState([enigmaConfig], { enigma: enigmaConfig.id }),
          enigma,
        });

      test("false when machine state matches the config", () => {
        expect(
          selectIsActiveConfigModified(stateWith(matchingEnigma), "enigma"),
        ).toBe(false);
      });

      test("true when the reflector differs", () => {
        const state = stateWith({ ...matchingEnigma, reflector: "C" });
        expect(selectIsActiveConfigModified(state, "enigma")).toBe(true);
      });

      test("true when a rotor differs", () => {
        const state = stateWith({
          ...matchingEnigma,
          rotorTypes: ["I", "II", "IV"],
        });
        expect(selectIsActiveConfigModified(state, "enigma")).toBe(true);
      });

      test("true when the plugboard differs", () => {
        const state = stateWith({ ...matchingEnigma, plugboard: "AB" });
        expect(selectIsActiveConfigModified(state, "enigma")).toBe(true);
      });
    });

    describe("m209", () => {
      const drumMatch = baseState.m209.drumState;
      const wheelMatch = baseState.m209.wheelState.map(() => "A");
      const config: M209Config = {
        ...m209Config,
        drumState: drumMatch,
        wheelState: wheelMatch,
      };
      const matchingM209: RootState["m209"] = {
        ...baseState.m209,
        wheelState: wheelMatch,
      };

      const stateWith = (m209: RootState["m209"]) =>
        rootWith({
          config: makeConfigState([config], { m209: config.id }),
          m209,
        });

      test("false when drum and wheel state match the config", () => {
        expect(
          selectIsActiveConfigModified(stateWith(matchingM209), "m209"),
        ).toBe(false);
      });

      test("false when an all-empty-wheel config matches (empty is a real value, not 'unset')", () => {
        // Default wheelState is all "". A config saved in that state must not
        // read as modified just because "" is falsy.
        const emptyConfig: M209Config = {
          ...m209Config,
          drumState: baseState.m209.drumState,
          wheelState: baseState.m209.wheelState,
        };
        const state = rootWith({
          config: makeConfigState([emptyConfig], { m209: emptyConfig.id }),
          m209: baseState.m209,
        });
        expect(selectIsActiveConfigModified(state, "m209")).toBe(false);
      });

      test("true when a drum bar differs", () => {
        const drumState = drumMatch.map((pins, i): [number, number] =>
          i === 0 ? [1, 1] : pins,
        );
        const state = stateWith({ ...matchingM209, drumState });
        expect(selectIsActiveConfigModified(state, "m209")).toBe(true);
      });

      test("true when a wheel differs", () => {
        const wheelState = wheelMatch.map((pins, i) => (i === 0 ? "B" : pins));
        const state = stateWith({ ...matchingM209, wheelState });
        expect(selectIsActiveConfigModified(state, "m209")).toBe(true);
      });
    });

    describe("purple", () => {
      const stateWith = (purple: RootState["purple"]) =>
        rootWith({
          config: makeConfigState([purpleConfig], { purple: purpleConfig.id }),
          purple,
        });

      test("false when plugboard and switch order match the config", () => {
        expect(
          selectIsActiveConfigModified(stateWith(baseState.purple), "purple"),
        ).toBe(false);
      });

      test("true when the plugboard differs", () => {
        const state = stateWith({ ...baseState.purple, plugboard: "BAEIOU" });
        expect(selectIsActiveConfigModified(state, "purple")).toBe(true);
      });

      test("true when the switch order differs", () => {
        const state = stateWith({ ...baseState.purple, switchOrder: "3-2-1" });
        expect(selectIsActiveConfigModified(state, "purple")).toBe(true);
      });
    });
  });
});
