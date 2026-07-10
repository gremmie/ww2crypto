import { describe, expect, test } from "vitest";

import type { M209Config } from "../../../src/features/m209/config/m209Config.ts";
import type { PurpleConfig } from "../../../src/features/purple/config/purpleConfig.ts";
import ConfigStorage from "../../../src/features/config/configStorage.ts";

// localStorage is mocked and reset per test in test/setup.ts (Node's global
// localStorage is a non-functional stub, see the note there and in AGENTS.md).

const purpleConfig: PurpleConfig = {
  type: "purple",
  id: "purple-1",
  name: "Alpha",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "ABCDEF",
  switchOrder: "1-2-3",
};

const m209Config: M209Config = {
  type: "m209",
  id: "m209-1",
  name: "Bravo",
  createdAt: "2026-07-10T00:00:00.000Z",
  drumState: [],
  wheelState: [],
};

describe("ConfigStorage", () => {
  test("loadConfigs returns an empty array when nothing is stored", () => {
    expect(ConfigStorage.loadConfigs()).toEqual([]);
  });

  test("saveConfig then loadConfigs round-trips a single config", () => {
    ConfigStorage.saveConfig(purpleConfig);
    expect(ConfigStorage.loadConfigs()).toEqual([purpleConfig]);
  });

  test("saveConfig appends to existing configs", () => {
    ConfigStorage.saveConfig(purpleConfig);
    ConfigStorage.saveConfig(m209Config);
    expect(ConfigStorage.loadConfigs()).toEqual([purpleConfig, m209Config]);
  });

  test("removeConfig removes only the matching id", () => {
    ConfigStorage.saveConfig(purpleConfig);
    ConfigStorage.saveConfig(m209Config);

    ConfigStorage.removeConfig(purpleConfig.id);

    expect(ConfigStorage.loadConfigs()).toEqual([m209Config]);
  });

  test("removeConfig is a no-op when the id is not present", () => {
    ConfigStorage.saveConfig(purpleConfig);

    ConfigStorage.removeConfig("does-not-exist");

    expect(ConfigStorage.loadConfigs()).toEqual([purpleConfig]);
  });

  test("saveConfigs replaces the entire stored set", () => {
    ConfigStorage.saveConfig(purpleConfig);

    ConfigStorage.saveConfigs([m209Config]);

    expect(ConfigStorage.loadConfigs()).toEqual([m209Config]);
  });
});
