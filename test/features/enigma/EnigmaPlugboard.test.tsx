import { screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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
  let numberPlugs: number[];
  let letterPlugs: string[];

  beforeEach(() => {
    numberPlugs = Array.from({ length: 26 }).map((_, i) => i + 1);
    letterPlugs = numberPlugs.map((n) => String.fromCharCode(aCode + n - 1));
  });

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

  test("Two cable test with the dropdown controls - letters", async () => {
    const user = userEvent.setup();
    const store = setupStore();
    store.dispatch(modelChanged(3));
    store.dispatch(setupStepChanged(3));

    renderWithProviders(<EnigmaPlugboard />, { store });

    expect(screen.getByText("Connections (0):")).toBeInTheDocument();
    expect(screen.getByText("No connections")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Letters" })).toBeChecked();

    const plug1 = screen.getByRole("combobox", { name: "Plug 1" });
    const plug2 = screen.getByRole("combobox", { name: "Plug 2" });

    await user.click(plug1);
    let menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(26);
    let choices = menuItems.map((m) => m.textContent);
    expect(choices).toEqual(letterPlugs);
    await user.click(menuItems[12]);

    await user.click(plug2);
    menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(25);
    choices = menuItems.map((m) => m.textContent);
    letterPlugs.splice(12, 1);
    expect(choices).toEqual(letterPlugs);
    await user.click(menuItems[11]);

    const connectButton = screen.getByRole("button", { name: "Connect" });
    await user.click(connectButton);

    expect(screen.getByText("Connections (1):")).toBeInTheDocument();
    expect(screen.queryByText("No connections")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LM" })).toBeInTheDocument();

    await user.click(plug1);
    menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(24);
    choices = menuItems.map((m) => m.textContent);
    letterPlugs.splice(letterPlugs.indexOf("L"), 1);
    expect(choices).toEqual(letterPlugs);
    await user.click(menuItems[0]);

    await user.click(plug2);
    menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(23);
    choices = menuItems.map((m) => m.textContent);
    letterPlugs.splice(letterPlugs.indexOf("A"), 1);
    expect(choices).toEqual(letterPlugs);
    await user.click(menuItems[22]);

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
    const user = userEvent.setup();
    const store = setupStore();
    store.dispatch(modelChanged(3));
    store.dispatch(setupStepChanged(3));

    renderWithProviders(<EnigmaPlugboard />, { store });

    expect(screen.getByText("Connections (0):")).toBeInTheDocument();
    expect(screen.getByText("No connections")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Letters" })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: "Numbers" }));

    const plug1 = screen.getByRole("combobox", { name: "Plug 1" });
    const plug2 = screen.getByRole("combobox", { name: "Plug 2" });

    await user.click(plug1);
    let menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(26);
    let choices = menuItems.map((m) => parseInt(m.textContent));
    expect(choices).toEqual(numberPlugs);
    await user.click(menuItems[12]);

    await user.click(plug2);
    menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(25);
    choices = menuItems.map((m) => parseInt(m.textContent));
    numberPlugs.splice(12, 1);
    expect(choices).toEqual(numberPlugs);
    await user.click(menuItems[11]);

    const connectButton = screen.getByRole("button", { name: "Connect" });
    await user.click(connectButton);

    expect(screen.getByText("Connections (1):")).toBeInTheDocument();
    expect(screen.queryByText("No connections")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "12/13" })).toBeInTheDocument();

    await user.click(plug1);
    menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(24);
    choices = menuItems.map((m) => parseInt(m.textContent));
    numberPlugs.splice(numberPlugs.indexOf(12), 1);
    expect(choices).toEqual(numberPlugs);
    await user.click(menuItems[0]);

    await user.click(plug2);
    menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(23);
    choices = menuItems.map((m) => parseInt(m.textContent));
    numberPlugs.splice(numberPlugs.indexOf(1), 1);
    expect(choices).toEqual(numberPlugs);
    await user.click(menuItems[22]);

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
});
