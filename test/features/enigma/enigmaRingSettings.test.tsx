import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { setupStore } from "../../../src/app/store.ts";
import EnigmaRingSettings from "../../../src/features/enigma/enigmaRingSettings.tsx";
import {
  modelChanged,
  type NotationType,
  setupStepChanged,
} from "../../../src/features/enigma/enigmaSlice.ts";
import { aCode } from "../../../src/features/enigma/utils.ts";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("EnigmaRingSettings", () => {
  const numberSettings = Array.from({ length: 26 }, (_, i) => i + 1);
  const letterSettings = numberSettings.map((n) =>
    String.fromCharCode(aCode + n - 1),
  );

  const testRingSettings = async (
    numRotors: number,
    notation: NotationType,
  ) => {
    const user = userEvent.setup();
    const store = setupStore();
    store.dispatch(modelChanged(numRotors));
    store.dispatch(setupStepChanged(2));

    renderWithProviders(<EnigmaRingSettings />, { store });

    expect(screen.getByText("Establish ring settings")).toBeInTheDocument();

    const numberOption = screen.getByRole("radio", { name: "Numbers" });
    const letterOption = screen.getByRole("radio", { name: "Letters" });

    if (numRotors === 3) {
      expect(numberOption).toBeChecked();
      expect(letterOption).not.toBeChecked();
    } else {
      expect(numberOption).not.toBeChecked();
      expect(letterOption).toBeChecked();
    }

    if (notation === "letter") {
      await user.click(letterOption);
    } else {
      await user.click(numberOption);
    }

    const ringSelects = screen.getAllByRole("combobox", { name: /Rotor \d/ });
    expect(ringSelects).toHaveLength(numRotors);
    for (let i = 0; i < ringSelects.length; ++i) {
      await user.click(ringSelects[i]);
      const menuItems = screen.getAllByRole("option");
      const settings = notation === "letter" ? letterSettings : numberSettings;
      expect(menuItems).toHaveLength(settings.length);

      const rotorLabels = menuItems.map((m) =>
        notation === "letter" ? m.textContent : parseInt(m.textContent),
      );
      expect(rotorLabels).toEqual(settings);
      await user.click(menuItems[i]);
    }
    const expectedRingSettings = numRotors === 3 ? [0, 1, 2] : [0, 1, 2, 3];
    expect(store.getState().enigma.ringSettings).toEqual(expectedRingSettings);
  };

  test("Three rotor test - numbers", async () => {
    await testRingSettings(3, "number");
  });

  test("Three rotor test - letters", async () => {
    await testRingSettings(3, "letter");
  });

  test("Four rotor test - numbers", async () => {
    await testRingSettings(4, "number");
  });

  test("Four rotor test - letters", async () => {
    await testRingSettings(4, "letter");
  });
});
