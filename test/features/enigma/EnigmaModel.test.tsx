import { screen } from "@testing-library/react";
import { expect, test } from "vitest";
import EnigmaModel from "../../../src/features/enigma/EnigmaModel.tsx";
import { renderWithProviders } from "../../utils/test-utils.tsx";

test("Enigma Model trial test", () => {
  renderWithProviders(<EnigmaModel />);

  expect(screen.getByText("Select Model")).toBeInTheDocument();
});
