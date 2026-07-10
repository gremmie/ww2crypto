import { describe, expect, test } from "vitest";

import type { RootState } from "../../../src/app/setupStore.ts";
import type { EnigmaConfig } from "../../../src/features/enigma/config/enigmaConfig.ts";
import type { M209Config } from "../../../src/features/m209/config/m209Config.ts";
import type { PurpleConfig } from "../../../src/features/purple/config/purpleConfig.ts";
import {
  configSaved,
  loadConfigInitiated,
  saveConfigInitiated,
} from "../../../src/features/config/configSlice.ts";
import ConfigStorage from "../../../src/features/config/configStorage.ts";
import { setupTestStore } from "../../utils/test-utils.tsx";

// localStorage is a per-test mock installed in test/setup.ts. configMiddleware
// is wired into the store by setupStore, so these exercise it end-to-end.

const baseState: RootState = setupTestStore().getState();

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

const m209Config: M209Config = {
  type: "m209",
  id: "m1",
  name: "M209 A",
  createdAt: "2026-07-10T00:00:00.000Z",
  drumState: baseState.m209.drumState.map((pins, i): [number, number] =>
    i === 0 ? [1, 2] : pins,
  ),
  wheelState: baseState.m209.wheelState.map((pins, i) =>
    i === 0 ? "ABC" : pins,
  ),
};

const purpleConfig: PurpleConfig = {
  type: "purple",
  id: "p1",
  name: "Purple A",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "BAEIOUYCDFGHJKLMNPQRSTVWXZ",
  switchOrder: "3-2-1",
};

describe("configMiddleware — saveConfigInitiated", () => {
  test("builds an enigma config from machine state, persists it, and dispatches configSaved", () => {
    const store = setupTestStore({
      preloadedState: {
        enigma: {
          ...baseState.enigma,
          reflector: "B",
          rotorTypes: ["I", "II", "III"],
          ringSettings: [1, 1, 1],
          ringSettingsNotation: "number",
          plugboard: "AB CD",
          plugboardNotation: "letter",
        },
      },
    });

    store.dispatch(
      saveConfigInitiated({ name: "My Enigma", machineType: "enigma" }),
    );

    const stored = ConfigStorage.loadConfigs();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      type: "enigma",
      name: "My Enigma",
      reflector: "B",
      rotors: ["I", "II", "III"],
      rings: [1, 1, 1],
      ringNotation: "number",
      plugboard: "AB CD",
      plugboardNotation: "letter",
    });
    expect(stored[0]!.id).toEqual(expect.any(String));
    expect(new Date(stored[0]!.createdAt).toISOString()).toBe(
      stored[0]!.createdAt,
    );

    // configSaved landed in state and marked the new config active.
    const savedId = stored[0]!.id;
    expect(store.getState().config.configs.entities[savedId]).toEqual(
      stored[0],
    );
    expect(store.getState().config.loadedConfigs.enigma).toBe(savedId);
  });

  test("builds an m209 config from machine state", () => {
    const store = setupTestStore({
      preloadedState: {
        m209: {
          ...baseState.m209,
          drumState: m209Config.drumState,
          wheelState: m209Config.wheelState,
        },
      },
    });

    store.dispatch(
      saveConfigInitiated({ name: "My M209", machineType: "m209" }),
    );

    const stored = ConfigStorage.loadConfigs();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      type: "m209",
      name: "My M209",
      drumState: m209Config.drumState,
      wheelState: m209Config.wheelState,
    });
    expect(store.getState().config.loadedConfigs.m209).toBe(stored[0]!.id);
  });

  test("builds a purple config from machine state", () => {
    const store = setupTestStore({
      preloadedState: {
        purple: {
          ...baseState.purple,
          plugboard: purpleConfig.plugboard,
          switchOrder: purpleConfig.switchOrder,
        },
      },
    });

    store.dispatch(
      saveConfigInitiated({ name: "My Purple", machineType: "purple" }),
    );

    const stored = ConfigStorage.loadConfigs();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      type: "purple",
      name: "My Purple",
      plugboard: purpleConfig.plugboard,
      switchOrder: purpleConfig.switchOrder,
    });
    expect(store.getState().config.loadedConfigs.purple).toBe(stored[0]!.id);
  });
});

describe("configMiddleware — loadConfigInitiated", () => {
  test("loads an enigma config into the enigma slice", () => {
    const store = setupTestStore();
    store.dispatch(configSaved(enigmaConfig)); // seed the config into state

    store.dispatch(loadConfigInitiated(enigmaConfig.id));

    const enigma = store.getState().enigma;
    expect(enigma.reflector).toBe("B");
    expect(enigma.rotorTypes).toEqual(["I", "II", "III"]);
    expect(enigma.ringSettings).toEqual([1, 1, 1]);
    expect(enigma.ringSettingsNotation).toBe("number");
    expect(enigma.plugboard).toBe("AB CD");
    expect(enigma.plugboardNotation).toBe("letter");
  });

  test("loads an m209 config into the m209 slice", () => {
    const store = setupTestStore();
    store.dispatch(configSaved(m209Config));

    store.dispatch(loadConfigInitiated(m209Config.id));

    const m209 = store.getState().m209;
    expect(m209.drumState).toEqual(m209Config.drumState);
    expect(m209.wheelState).toEqual(m209Config.wheelState);
  });

  test("loads a purple config into the purple slice", () => {
    const store = setupTestStore();
    store.dispatch(configSaved(purpleConfig));

    store.dispatch(loadConfigInitiated(purpleConfig.id));

    const purple = store.getState().purple;
    expect(purple.plugboard).toBe(purpleConfig.plugboard);
    expect(purple.switchOrder).toBe(purpleConfig.switchOrder);
  });

  test("does nothing when the config id is unknown", () => {
    const store = setupTestStore();
    const before = store.getState();

    store.dispatch(loadConfigInitiated("does-not-exist"));

    const after = store.getState();
    expect(after.enigma).toEqual(before.enigma);
    expect(after.m209).toEqual(before.m209);
    expect(after.purple).toEqual(before.purple);
  });
});
