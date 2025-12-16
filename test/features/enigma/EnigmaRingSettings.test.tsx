import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { setupStore } from "../../../src/app/store.ts";
import EnigmaSetup from "../../../src/features/enigma/EnigmaSetup.tsx";
import {
  modelChanged,
  setupStepChanged,
} from "../../../src/features/enigma/enigmaSlice.ts";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("EnigmaRingSettings", () => {
  const expectedReflectors = new Map<number, string[]>([
    [3, ["B", "C"]],
    [4, ["B-Thin", "C-Thin"]],
  ]);

  const baseRotorChoices = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  const expectedRotors = new Map<number, string[][]>([
    [3, [baseRotorChoices, baseRotorChoices, baseRotorChoices]],
    [
      4,
      [["Beta", "Gamma"], baseRotorChoices, baseRotorChoices, baseRotorChoices],
    ],
  ]);

  const testRotorSetup = async (numRotors: number) => {
    const user = userEvent.setup();
    const store = setupStore();
    store.dispatch(modelChanged(numRotors));
    store.dispatch(setupStepChanged(1));

    renderWithProviders(<EnigmaSetup />, { store });

    expect(
      screen.getByText("Select reflector, rotors, and rotor order"),
    ).toBeInTheDocument();

    const reflector = screen.getByRole("combobox", { name: "Reflector" });
    await user.click(reflector);
    let menuItems = screen.getAllByRole("option");
    const reflectorChoices = menuItems.map((m) => m.textContent);
    expect(reflectorChoices).toEqual(expectedReflectors.get(numRotors));

    await user.click(menuItems[1]);
    expect(store.getState().enigma.reflector).toEqual(
      numRotors === 3 ? "C" : "C-Thin",
    );

    const rotorSelects = screen.getAllByRole("combobox", { name: /Rotor \d/ });
    expect(rotorSelects).toHaveLength(numRotors);
    for (let i = 0; i < rotorSelects.length; ++i) {
      await user.click(rotorSelects[i]);
      menuItems = screen.getAllByRole("option");

      const rotors = expectedRotors.get(numRotors)!;
      expect(menuItems).toHaveLength(rotors[i].length);
      const rotorLabels = menuItems.map((m) => m.textContent);
      expect(rotorLabels).toEqual(rotors[i]);
      await user.click(menuItems[i]);
    }
    const expectedRotorTypes =
      numRotors === 3 ? ["I", "II", "III"] : ["Beta", "II", "III", "IV"];
    expect(store.getState().enigma.rotorTypes).toEqual(expectedRotorTypes);
  };

  test("Three rotor test", async () => {
    await testRotorSetup(3);
  });

  test("Four rotor test", async () => {
    await testRotorSetup(4);
  });
});
