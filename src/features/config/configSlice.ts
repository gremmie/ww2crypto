import {
  createEntityAdapter,
  createSelector,
  createSlice,
  type EntityState,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";
import { applicationStarted } from "../common/actions.ts";
import type { MachineConfig } from "../common/config/machineConfig.ts";
import type { MachineType } from "../common/config/machineType.ts";
import { selectIsSetupComplete } from "../enigma/enigmaSlice.ts";
import ConfigStorage from "./configStorage.ts";

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
  loadedConfigs: Record<MachineType, string | null>;
}

const initialState: ConfigState = {
  configs: configAdapter.getInitialState(),
  loadedConfigs: {
    enigma: null,
    m209: null,
    purple: null,
  },
};

export const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {
    loadConfigInitiated: (state, action: PayloadAction<string>) => {
      const config = configAdapter
        .getSelectors()
        .selectById(state.configs, action.payload);
      if (config === undefined) return;
      state.loadedConfigs[config.type] = config.id;
    },
    deleteConfigInitiated: (state, action: PayloadAction<string>) => {
      const config = configAdapter
        .getSelectors()
        .selectById(state.configs, action.payload);
      configAdapter.removeOne(state.configs, config.id);
      if (state.loadedConfigs[config.type] === config.id) {
        state.loadedConfigs[config.type] = null;
      }
      ConfigStorage.removeConfig(config.id);
    },
    undoDeleteConfigInitiated: (
      state,
      action: PayloadAction<MachineConfig>,
    ) => {
      configAdapter.setOne(state.configs, action.payload);
      ConfigStorage.saveConfig(action.payload);
    },
    saveConfigInitiated: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<SaveConfigInitiatedPayload>,
    ) => {},
    configSaved: (state, action: PayloadAction<MachineConfig>) => {
      const newConfig = action.payload;
      configAdapter.setOne(state.configs, newConfig);
      state.loadedConfigs[newConfig.type] = newConfig.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(applicationStarted, (state) => {
      configAdapter.setAll(state.configs, ConfigStorage.loadConfigs());
    });
  },
});

export interface SaveConfigInitiatedPayload {
  name: string;
  machineType: MachineType;
}

export const {
  loadConfigInitiated,
  deleteConfigInitiated,
  undoDeleteConfigInitiated,
  saveConfigInitiated,
  configSaved,
} = configSlice.actions;

// Selectors

export const selectConfigById = (state: RootState, configId: string) => {
  return configSelectors.selectById(state, configId);
};

const selectAllConfigs = (state: RootState) => {
  return configSelectors.selectAll(state);
};

const selectConfigType = (_state: RootState, machineType: MachineType) =>
  machineType;

export const selectConfigsByType = createSelector(
  selectAllConfigs,
  selectConfigType,
  (allConfigs, configType) => {
    return allConfigs.filter((config) => config.type == configType);
  },
);

export const selectConfigNamesByType = createSelector(
  selectAllConfigs,
  selectConfigType,
  (allConfigs, configType) => {
    return allConfigs
      .filter((config) => config.type == configType)
      .map((config) => config.name);
  },
);

export const selectActiveConfig = (
  state: RootState,
  machineType: MachineType,
) => {
  const activeId = state.config.loadedConfigs[machineType];
  if (activeId === null) return null;
  return configSelectors.selectById(state, activeId);
};

export const selectIsSetupCompleteForType = (
  state: RootState,
  machineType: MachineType,
) => {
  switch (machineType) {
    case "enigma":
      return selectIsSetupComplete(state);
    default:
      return false;
  }
};

export const selectIsActiveConfigModified = (
  state: RootState,
  machineType: MachineType,
) => {
  const activeConfig = selectActiveConfig(state, machineType);
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
