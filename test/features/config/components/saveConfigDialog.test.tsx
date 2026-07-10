import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import type { RootState } from "../../../../src/app/setupStore.ts";
import SaveConfigDialog from "../../../../src/features/config/components/saveConfigDialog.tsx";
import type { ConfigState } from "../../../../src/features/config/configSlice.ts";
import ConfigStorage from "../../../../src/features/config/configStorage.ts";
import type { MachineConfig } from "../../../../src/features/common/config/machineConfig.ts";
import type { PurpleConfig } from "../../../../src/features/purple/config/purpleConfig.ts";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../utils/test-utils.tsx";

/** Build a config slice holding the given configs, none marked active. */
function configState(configs: MachineConfig[]): ConfigState {
  return {
    configs: {
      ids: configs.map((c) => c.id),
      entities: Object.fromEntries(configs.map((c) => [c.id, c])),
    },
    loadedConfigs: { enigma: null, m209: null, purple: null },
  };
}

describe("SaveConfigDialog", () => {
  test("enables the Save Setup button when nothing is saved yet", () => {
    renderWithProviders(<SaveConfigDialog machineType="purple" />, {
      store: setupTestStore(),
    });
    expect(screen.getByRole("button", { name: "Save Setup" })).toBeEnabled();
  });

  test("saving a named setup persists it and adds it to state", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(
      <SaveConfigDialog machineType="purple" />,
      { store },
    );

    await user.click(screen.getByRole("button", { name: "Save Setup" }));
    await user.type(await screen.findByRole("textbox"), "My Purple");
    await user.click(screen.getByRole("button", { name: "Save" }));

    const stored = ConfigStorage.loadConfigs();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ type: "purple", name: "My Purple" });

    const savedId = stored[0]!.id;
    expect(store.getState().config.configs.entities[savedId]).toEqual(
      stored[0],
    );
    expect(store.getState().config.loadedConfigs.purple).toBe(savedId);
  });

  test("warns on a duplicate name and requires the overwrite toggle to save", async () => {
    const existing: PurpleConfig = {
      type: "purple",
      id: "pe",
      name: "Existing",
      createdAt: "2026-07-10T00:00:00.000Z",
      plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
      switchOrder: "1-2-3",
    };
    const preloadedState: Partial<RootState> = {
      config: configState([existing]),
    };
    const { user } = renderWithProviders(
      <SaveConfigDialog machineType="purple" />,
      { store: setupTestStore({ preloadedState }) },
    );

    await user.click(screen.getByRole("button", { name: "Save Setup" }));
    await user.type(await screen.findByRole("textbox"), "Existing");

    expect(
      screen.getByText("A setup with this name already exists."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();

    // Toggle the overwrite Switch via its label.
    await user.click(screen.getByText("Overwrite existing setup"));
    expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
  });
});
