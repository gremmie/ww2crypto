import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import LoadConfigDialog from "../../../../src/features/config/components/loadConfigDialog.tsx";
import { configSaved } from "../../../../src/features/config/configSlice.ts";
import type { PurpleConfig } from "../../../../src/features/purple/config/purpleConfig.ts";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../utils/test-utils.tsx";

const configA: PurpleConfig = {
  type: "purple",
  id: "pa",
  name: "Alpha",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "BEIOUYACDFGHJKLMNPQRSTVWXZ",
  switchOrder: "2-1-3",
};

const configB: PurpleConfig = {
  type: "purple",
  id: "pb",
  name: "Bravo",
  createdAt: "2026-07-10T00:00:00.000Z",
  plugboard: "ZEIOUYBCDFGHJKLMNPQRSTVWXA",
  switchOrder: "3-2-1",
};

/** A store seeded with the given purple configs. */
function seededStore(...configs: PurpleConfig[]) {
  const store = setupTestStore();
  configs.forEach((c) => store.dispatch(configSaved(c)));
  return store;
}

describe("LoadConfigDialog", () => {
  test("disables the Load Setup button when there are no saved configs", () => {
    renderWithProviders(<LoadConfigDialog machineType="purple" />, {
      store: setupTestStore(),
    });
    expect(screen.getByRole("button", { name: "Load Setup" })).toBeDisabled();
  });

  test("opens the dialog and lists the saved configs", async () => {
    const store = seededStore(configA, configB);
    const { user } = renderWithProviders(
      <LoadConfigDialog machineType="purple" />,
      { store },
    );

    await user.click(screen.getByRole("button", { name: "Load Setup" }));

    expect(await screen.findByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Bravo")).toBeInTheDocument();
  });

  test("selecting a config and clicking Load dispatches the load", async () => {
    const store = seededStore(configA, configB);
    const { user } = renderWithProviders(
      <LoadConfigDialog machineType="purple" />,
      { store },
    );

    await user.click(screen.getByRole("button", { name: "Load Setup" }));
    // Load button is disabled until a config is selected.
    expect(screen.getByRole("button", { name: "Load" })).toBeDisabled();

    await user.click(await screen.findByText("Alpha"));
    expect(screen.getByRole("button", { name: "Load" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "Load" }));

    expect(store.getState().config.loadedConfigs.purple).toBe(configA.id);
    expect(store.getState().purple.plugboard).toBe(configA.plugboard);
    expect(store.getState().purple.switchOrder).toBe(configA.switchOrder);
  });

  test("double-clicking a config loads it immediately", async () => {
    const store = seededStore(configA, configB);
    const { user } = renderWithProviders(
      <LoadConfigDialog machineType="purple" />,
      { store },
    );

    await user.click(screen.getByRole("button", { name: "Load Setup" }));
    await user.dblClick(await screen.findByText("Bravo"));

    expect(store.getState().config.loadedConfigs.purple).toBe(configB.id);
    expect(store.getState().purple.plugboard).toBe(configB.plugboard);
  });

  test("deleting a config removes it and offers an undo that restores it", async () => {
    const store = seededStore(configA, configB);
    const { user } = renderWithProviders(
      <LoadConfigDialog machineType="purple" />,
      { store },
    );

    await user.click(screen.getByRole("button", { name: "Load Setup" }));
    await screen.findByText("Alpha");

    // Delete the first card (Alpha).
    await user.click(screen.getAllByRole("button", { name: "delete" })[0]!);

    // The delete alert offers an Undo action.
    const undo = screen.getByRole("button", { name: "Undo" });
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    expect(store.getState().config.configs.ids).not.toContain(configA.id);

    await user.click(undo);

    expect(await screen.findByText("Alpha")).toBeInTheDocument();
    expect(store.getState().config.configs.ids).toContain(configA.id);
  });
});
