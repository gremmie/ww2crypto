import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";
import { applicationStarted } from "../common/actions.ts";
import type { MachineConfig } from "../common/config/machineConfig.ts";
import ConfigStorage2 from "./configStorage2.ts";

const configAdapter = createEntityAdapter({
  selectId: (config: MachineConfig) => config.id,
  sortComparer: (a, b) => {
    const typeCompare = a.type.localeCompare(b.type);
    if (typeCompare !== 0) return typeCompare;
    return a.name.localeCompare(b.name);
  },
});

const configSelectors = configAdapter.getSelectors<RootState>(
  (state) => state.config.configs,
);

export interface ConfigState {
  configs: EntityState<MachineConfig, string>;
  activeConfig: string | null;
}

const initialState: ConfigState = {
  configs: configAdapter.getInitialState(),
  activeConfig: null,
};

export const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicationStarted, (state) => {
      configAdapter.setAll(state.configs, ConfigStorage2.loadConfigs());
    });
  },
});

//export const { } = configSlice.actions;

// Selectors

export const selectActiveConfig = (state: RootState) => {
  const activeId = state.config.activeConfig;
  if (activeId === null) return null;
  return configSelectors.selectById(state, activeId);
};

export const selectIsActiveConfigModified = (state: RootState) => {
  const activeConfig = selectActiveConfig(state);
  if (activeConfig === null) return false;

  if (activeConfig.type === "enigma") {
    const enigmaState = state.enigma;
    if (activeConfig.reflector !== enigmaState.reflector) return true;
    if (activeConfig.rotors.length !== enigmaState.rotorTypes.length)
      return true;
    if (
      !activeConfig.rotors.every(
        (value, index) => value == enigmaState.rotorTypes[index],
      )
    ) {
      return true;
    }
    if (activeConfig.rings.length !== enigmaState.rotorTypes.length)
      return true;
    if (
      !activeConfig.rings.every(
        (value, index) => value == enigmaState.ringSettings[index],
      )
    ) {
      return true;
    }
    if (activeConfig.ringNotation !== enigmaState.ringSettingsNotation)
      return true;
    if (activeConfig.plugboard !== enigmaState.plugboard) return true;
    return activeConfig.plugboardNotation !== enigmaState.plugboardNotation;
  }
  return false;
};

export default configSlice.reducer;
