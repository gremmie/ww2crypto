import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SwitchesSetup } from "../../../../../src/features/purple/components/setup/switchesSetup.tsx";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../../utils/test-utils.tsx";

describe("SwitchesSetup", () => {
  test("Can display and pick switch order", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<SwitchesSetup />, { store });

    expect(screen.getByText("Fast: 1")).toBeInTheDocument();
    expect(screen.getByText("Medium: 2")).toBeInTheDocument();
    expect(screen.getByText("Slow: 3")).toBeInTheDocument();

    const switchOrder = screen.getByRole("combobox", { name: "Switch Order" });
    await user.click(switchOrder);
    const choices = screen.getAllByRole("option");
    expect(choices).toHaveLength(6);
    const foundChoices = choices.map((c) => c.textContent);
    const expectedChoices = [
      "1-2-3",
      "1-3-2",
      "2-1-3",
      "2-3-1",
      "3-1-2",
      "3-2-1",
    ];
    expect(foundChoices).toEqual(expectedChoices);

    await user.click(choices[3]!);
    expect(screen.getByText("Fast: 2")).toBeInTheDocument();
    expect(screen.getByText("Medium: 3")).toBeInTheDocument();
    expect(screen.getByText("Slow: 1")).toBeInTheDocument();
  });
});
