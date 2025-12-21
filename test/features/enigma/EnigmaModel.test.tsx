import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import EnigmaSetupTab from "../../../src/features/enigma/EnigmaSetupTab.tsx";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("EnigmaModel", () => {
  test("Radio buttons change the model", async () => {
    const user = userEvent.setup();
    renderWithProviders(<EnigmaSetupTab />);

    expect(screen.getByText("Select Model")).toBeInTheDocument();

    let fourRotorOption = screen.getByRole("radio", {
      name: "Four Rotor (Navy M4)",
    });
    expect(fourRotorOption).toBeEnabled();
    expect(fourRotorOption).not.toBeChecked();
    await user.click(fourRotorOption);

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeEnabled();
    await user.click(nextButton);

    let rotorSelects = screen.getAllByRole("combobox", { name: /Rotor \d/ });
    expect(rotorSelects).toHaveLength(4);

    const backButton = screen.getByRole("button", { name: "Back" });
    await user.click(backButton);
    expect(backButton).toBeDisabled();

    fourRotorOption = screen.getByRole("radio", {
      name: "Four Rotor (Navy M4)",
    });
    expect(fourRotorOption).toBeChecked();

    let threeRotorOption = screen.getByRole("radio", {
      name: "Three Rotor (Army, Air Force, Navy M3)",
    });
    expect(threeRotorOption).toBeEnabled();
    expect(threeRotorOption).not.toBeChecked();
    await user.click(threeRotorOption);

    await user.click(nextButton);
    rotorSelects = screen.getAllByRole("combobox", { name: /Rotor \d/ });
    expect(rotorSelects).toHaveLength(3);

    await user.click(backButton);
    threeRotorOption = screen.getByRole("radio", {
      name: "Three Rotor (Army, Air Force, Navy M3)",
    });
    expect(threeRotorOption).toBeChecked();
  });
});
