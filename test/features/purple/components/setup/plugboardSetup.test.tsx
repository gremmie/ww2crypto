import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PlugboardSetup } from "../../../../../src/features/purple/components/setup/plugboardSetup.tsx";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../../utils/test-utils.tsx";

describe("PlugboardSetup", () => {
  test("Can update plugboard wiring", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<PlugboardSetup />, { store });

    expect(screen.getByText("AEIOUY")).toBeInTheDocument();
    expect(screen.getByText("BCDFGHJKLMNPQRSTVWXZ")).toBeInTheDocument();
    const setButton = screen.getByRole("button", { name: "Set" });
    expect(setButton).toBeDisabled();

    const input = screen.getByRole("textbox", { name: "Plugboard Wiring" });
    await user.type(input, "noktyuxeqlhbrmpdicjasvwgzf");
    expect(setButton).toBeEnabled();
    await user.click(setButton);

    expect(screen.getByText("NOKTYU")).toBeInTheDocument();
    expect(screen.getByText("XEQLHBRMPDICJASVWGZF")).toBeInTheDocument();
    expect(setButton).toBeDisabled();
  });

  describe("Invalid wiring input", () => {
    test("not enough input", async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<PlugboardSetup />, { store });

      const input = screen.getByRole("textbox", { name: "Plugboard Wiring" });
      await user.type(input, "NOKTYUXE");
      const setButton = screen.getByRole("button", { name: "Set" });
      expect(setButton).toBeDisabled();
    });

    test("invalid input", async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<PlugboardSetup />, { store });

      const input = screen.getByRole("textbox", { name: "Plugboard Wiring" });
      await user.type(input, "noktyuxeqlhbr3pdicjasvwgzf");
      const setButton = screen.getByRole("button", { name: "Set" });
      expect(setButton).toBeDisabled();
    });

    test("duplicate letters", async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<PlugboardSetup />, { store });

      const input = screen.getByRole("textbox", { name: "Plugboard Wiring" });
      await user.type(input, "noktyuxeqlhbimpdicjasvwgzf");
      const setButton = screen.getByRole("button", { name: "Set" });
      expect(setButton).toBeDisabled();
    });
  });
});
