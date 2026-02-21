import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import EnigmaModel from "../../../../../src/features/enigma/components/setup/enigmaModel.tsx";
import { renderWithProviders } from "../../../../utils/test-utils.tsx";

describe("EnigmaModel", () => {
  test("Radio buttons change the model", async () => {
    const { user, store } = renderWithProviders(<EnigmaModel />);

    expect(screen.getByText("Select Model")).toBeInTheDocument();
    expect(store.getState().enigma.numberOfRotors).toEqual(3);

    const threeRotorOption = screen.getByRole("radio", {
      name: "Three Rotor (Army, Air Force, Navy M3)",
    });
    expect(threeRotorOption).toBeChecked();

    const fourRotorOption = screen.getByRole("radio", {
      name: "Four Rotor (Navy M4)",
    });
    expect(fourRotorOption).toBeEnabled();
    expect(fourRotorOption).not.toBeChecked();
    await user.click(fourRotorOption);
    expect(store.getState().enigma.numberOfRotors).toEqual(4);

    expect(threeRotorOption).toBeEnabled();
    expect(threeRotorOption).not.toBeChecked();
    await user.click(threeRotorOption);
    expect(store.getState().enigma.numberOfRotors).toEqual(3);
  });
});
