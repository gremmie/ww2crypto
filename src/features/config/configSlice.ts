import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
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

export const configSlice = createSlice({
  name: "config",
  initialState: configAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicationStarted, (state) => {
      configAdapter.setAll(state, ConfigStorage2.loadConfigs());
    });
  },
});

//export const { } = configSlice.actions;

export default configSlice.reducer;
