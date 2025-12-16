import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import EnigmaSetup from "../../../src/features/enigma/EnigmaSetup.tsx";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("EnigmaSetup", () => {
  test("Next and Back buttons", async () => {
    const user = userEvent.setup();
    renderWithProviders(<EnigmaSetup />);

    expect(screen.getByText("Select Model")).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: "Back" });
    expect(backButton).toBeDisabled();

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);
    expect(
      screen.getByText("Select reflector, rotors, and rotor order"),
    ).toBeInTheDocument();

    expect(backButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);
    expect(screen.getByText("Establish ring settings")).toBeInTheDocument();

    expect(backButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);
    expect(screen.getByText("Configure the plugboard")).toBeInTheDocument();

    expect(backButton).toBeEnabled();
    expect(nextButton).toBeDisabled();

    await user.click(backButton);
    expect(screen.getByText("Establish ring settings")).toBeInTheDocument();

    expect(backButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    await user.click(backButton);
    expect(
      screen.getByText("Select reflector, rotors, and rotor order"),
    ).toBeInTheDocument();

    expect(backButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    await user.click(backButton);
    expect(screen.getByText("Select Model")).toBeInTheDocument();

    expect(backButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  test("Stepper", async () => {
    const user = userEvent.setup();
    renderWithProviders(<EnigmaSetup />);

    expect(screen.getByText("Select Model")).toBeInTheDocument();

    const step1Button = screen.getByRole("button", { name: "Model" });
    expect(step1Button).toBeEnabled();

    const step2Button = screen.getByRole("button", {
      name: "Reflector & Rotors",
    });
    expect(step2Button).toBeEnabled();
    await user.click(step2Button);

    expect(
      screen.getByText("Select reflector, rotors, and rotor order"),
    ).toBeInTheDocument();

    const step3Button = screen.getByRole("button", {
      name: "Ring Settings",
    });
    expect(step3Button).toBeEnabled();
    await user.click(step3Button);

    expect(screen.getByText("Establish ring settings")).toBeInTheDocument();

    const step4Button = screen.getByRole("button", {
      name: "Plugboard",
    });
    await user.click(step4Button);
    expect(screen.getByText("Configure the plugboard")).toBeInTheDocument();

    await user.click(step1Button);
    expect(screen.getByText("Select Model")).toBeInTheDocument();
  });
});
