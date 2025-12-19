import { screen, within } from "@testing-library/react";
import { type UserEvent, userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { setupStore } from "../../../src/app/store.ts";
import EnigmaPlugboard from "../../../src/features/enigma/EnigmaPlugboard.tsx";
import {
  modelChanged,
  setupStepChanged,
} from "../../../src/features/enigma/enigmaSlice.ts";
import { aCode } from "../../../src/features/enigma/utils.ts";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("EnigmaPlugboard", () => {
  function testDefaultCableCount() {
    // Cable count should default to 10.
    const cableCount = screen.getByRole("combobox", { name: "Cable Count" });
    expect(cableCount).toHaveTextContent("10");
  }

  test("Three rotor defaults to alpha plugboard", () => {
    const store = setupStore();
    store.dispatch(modelChanged(3));
    store.dispatch(setupStepChanged(3));

    renderWithProviders(<EnigmaPlugboard />, { store });

    expect(screen.getByText("Configure the plugboard")).toBeInTheDocument();
    testDefaultCableCount();

    const numberOption = screen.getByRole("radio", { name: "Numbers" });
    const letterOption = screen.getByRole("radio", { name: "Letters" });

    expect(numberOption).not.toBeChecked();
    expect(letterOption).toBeChecked();
  });

  test("Four rotor defaults to numeric plugboard", () => {
    const store = setupStore();
    store.dispatch(modelChanged(4));
    store.dispatch(setupStepChanged(3));

    renderWithProviders(<EnigmaPlugboard />, { store });

    expect(screen.getByText("Configure the plugboard")).toBeInTheDocument();
    testDefaultCableCount();

    // Cable count should default to 10.
    const cableCount = screen.getByRole("combobox", { name: "Cable Count" });
    expect(cableCount).toHaveTextContent("10");

    const numberOption = screen.getByRole("radio", { name: "Numbers" });
    const letterOption = screen.getByRole("radio", { name: "Letters" });

    expect(numberOption).toBeChecked();
    expect(letterOption).not.toBeChecked();
  });

  describe("Cable tests", () => {
    let numberPlugs: string[];
    let letterPlugs: string[];

    beforeEach(() => {
      numberPlugs = Array.from({ length: 26 }).map((_, i) => `${i + 1}`);
      letterPlugs = Array.from({ length: 26 }).map((_, i) =>
        String.fromCharCode(aCode + i),
      );
    });

    function setup(numRotors: number) {
      const store = setupStore();
      store.dispatch(modelChanged(numRotors));
      store.dispatch(setupStepChanged(3));
      return {
        user: userEvent.setup(),
        ...renderWithProviders(<EnigmaPlugboard />, { store }),
      };
    }

    async function selectPlug(
      user: UserEvent,
      select: HTMLElement,
      n: number,
      expectedChoices: string[],
    ) {
      await user.click(select);
      const menuItems = screen.getAllByRole("option");
      const choices = menuItems.map((m) => m.textContent);
      expect(choices).toEqual(expectedChoices);
      await user.click(menuItems[n]);
    }

    test("Two cable test with the dropdown controls - letters", async () => {
      const { user } = setup(3);

      expect(screen.getByText("Connections (0):")).toBeInTheDocument();
      expect(screen.getByText("No connections")).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Letters" })).toBeChecked();

      const plug1 = screen.getByRole("combobox", { name: "Plug 1" });
      const plug2 = screen.getByRole("combobox", { name: "Plug 2" });

      await selectPlug(user, plug1, 12, letterPlugs);
      letterPlugs.splice(12, 1);
      await selectPlug(user, plug2, 11, letterPlugs);

      const connectButton = screen.getByRole("button", { name: "Connect" });
      await user.click(connectButton);

      expect(screen.getByText("Connections (1):")).toBeInTheDocument();
      expect(screen.queryByText("No connections")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "LM" })).toBeInTheDocument();

      letterPlugs.splice(letterPlugs.indexOf("L"), 1);
      await selectPlug(user, plug1, 0, letterPlugs);

      letterPlugs.splice(letterPlugs.indexOf("A"), 1);
      await selectPlug(user, plug2, 22, letterPlugs);
      await user.click(connectButton);

      expect(screen.getByText("Connections (2):")).toBeInTheDocument();
      expect(screen.queryByText("No connections")).not.toBeInTheDocument();
      const azButton = screen.getByRole("button", { name: "AZ" });
      expect(azButton).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "LM" })).toBeInTheDocument();

      await user.click(within(azButton).getByTestId("CancelIcon"));
      expect(screen.getByText("Connections (1):")).toBeInTheDocument();
      expect(screen.queryByText("No connections")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "AZ" }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "LM" })).toBeInTheDocument();

      const clearAll = screen.getByRole("button", { name: "Clear all" });
      await user.click(clearAll);

      expect(screen.getByText("Connections (0):")).toBeInTheDocument();
      expect(screen.getByText("No connections")).toBeInTheDocument();
    });

    test("Two cable test with the dropdown controls - numbers", async () => {
      const { user } = setup(3);

      expect(screen.getByText("Connections (0):")).toBeInTheDocument();
      expect(screen.getByText("No connections")).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Letters" })).toBeChecked();
      await user.click(screen.getByRole("radio", { name: "Numbers" }));

      const plug1 = screen.getByRole("combobox", { name: "Plug 1" });
      const plug2 = screen.getByRole("combobox", { name: "Plug 2" });

      await selectPlug(user, plug1, 12, numberPlugs);
      numberPlugs.splice(12, 1);
      await selectPlug(user, plug2, 11, numberPlugs);

      const connectButton = screen.getByRole("button", { name: "Connect" });
      await user.click(connectButton);

      expect(screen.getByText("Connections (1):")).toBeInTheDocument();
      expect(screen.queryByText("No connections")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "12/13" })).toBeInTheDocument();

      numberPlugs.splice(numberPlugs.indexOf("12"), 1);
      await selectPlug(user, plug1, 0, numberPlugs);
      numberPlugs.splice(numberPlugs.indexOf("1"), 1);
      await selectPlug(user, plug2, 22, numberPlugs);

      await user.click(connectButton);
      expect(screen.getByText("Connections (2):")).toBeInTheDocument();
      expect(screen.queryByText("No connections")).not.toBeInTheDocument();
      const azButton = screen.getByRole("button", { name: "1/26" });
      expect(azButton).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "12/13" })).toBeInTheDocument();

      await user.click(within(azButton).getByTestId("CancelIcon"));
      expect(screen.getByText("Connections (1):")).toBeInTheDocument();
      expect(screen.queryByText("No connections")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "1/26" }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "12/13" })).toBeInTheDocument();

      const clearAll = screen.getByRole("button", { name: "Clear all" });
      await user.click(clearAll);

      expect(screen.getByText("Connections (0):")).toBeInTheDocument();
      expect(screen.getByText("No connections")).toBeInTheDocument();
    });

    test("Connection string test - letters", async () => {
      const { user } = setup(3);
      const connectionStrInput = screen.getByLabelText("Connection String");
      await user.type(connectionStrInput, "AV BS CG DL FU HZ IN KM OW RX");

      const setButton = screen.getByRole("button", { name: "Set" });
      expect(setButton).toBeEnabled();
      await user.click(setButton);

      expect(screen.getByRole("button", { name: "AV" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "BS" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "CG" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "DL" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "FU" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "HZ" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "IN" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "KM" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "OW" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "RX" })).toBeInTheDocument();
    });

    test("Connection string test - numbers", async () => {
      const { user } = setup(4);
      const connectionStrInput = screen.getByLabelText("Connection String");
      await user.type(
        connectionStrInput,
        "1/22 2/19 3/7 4/12 6/21 8/26 9/14 11/13 15/23 18/24",
      );

      const setButton = screen.getByRole("button", { name: "Set" });
      expect(setButton).toBeEnabled();
      await user.click(setButton);

      expect(screen.getByRole("button", { name: "1/22" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "2/19" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "3/7" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "4/12" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "6/21" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "8/26" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "9/14" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "11/13" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "15/23" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "18/24" })).toBeInTheDocument();
    });
  });
});
