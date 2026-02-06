import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { setupStore } from "../../../src/app/store.ts";
import { EnigmaOperateTab } from "../../../src/features/enigma/components/setup/enigmaOperateTab.tsx";
import {
  modelChanged,
  plugboardBulkSet,
  reflectorChanged,
  ringSettingChanged,
  type RingSettingChangedPayload,
  rotorTypeChanged,
  type RotorTypeChangedPayload,
  selectIsSetupComplete,
} from "../../../src/features/enigma/enigmaSlice.ts";
import { aCode } from "../../../src/features/enigma/utils.ts";
import { renderWithProviders } from "../../utils/test-utils.tsx";

describe("Enigma Operate Tab", () => {
  test("Renders an empty view if machine not setup", async () => {
    const { user, store } = renderWithProviders(<EnigmaOperateTab />);

    expect(screen.getByText("Setup not complete")).toBeInTheDocument();
    expect(
      screen.getByText(
        (_content, element) =>
          element?.textContent === "Please finish setting up the machine.",
      ),
    );

    const setupButton = screen.getByRole("button", { name: "setting up" });
    await user.click(setupButton);
    expect(store.getState().enigma.currentTab).toEqual("setup");
  });

  test("Smoke testing basic operation of setup machine", async () => {
    const store = setupStore();
    store.dispatch(modelChanged(3));
    store.dispatch(reflectorChanged("B"));
    for (const [index, rotor] of ["III", "VI", "VIII"].entries()) {
      const payload: RotorTypeChangedPayload = {
        position: index,
        rotorType: rotor,
      };
      store.dispatch(rotorTypeChanged(payload));
    }
    for (const [index, ring] of ["A", "H", "M"].entries()) {
      const payload: RingSettingChangedPayload = {
        position: index,
        ringSetting: ring.charCodeAt(0) - aCode,
      };
      store.dispatch(ringSettingChanged(payload));
    }
    store.dispatch(plugboardBulkSet("AN EZ HK IJ LR MQ OT PV SW UX"));
    expect(selectIsSetupComplete(store.getState())).equals(true);

    const { user } = renderWithProviders(<EnigmaOperateTab />, {
      store: store,
    });

    // Set rotor window 0 to U.
    const rotorWindow0 = screen.getByRole("textbox", {
      name: "rotor window 0",
    }) as HTMLInputElement;
    expect(rotorWindow0).toHaveValue("A");
    await user.dblClick(rotorWindow0);
    await user.keyboard("U");
    expect(rotorWindow0).toHaveValue("U");

    // Set rotor window 1 to Z by clicking back.
    const backButtons = screen.getAllByRole("button", { name: "Back" });
    expect(backButtons).toHaveLength(3);
    await user.click(backButtons[1]);
    const rotorWindow1 = screen.getByRole("textbox", {
      name: "rotor window 1",
    }) as HTMLInputElement;
    expect(rotorWindow1).toHaveValue("Z");

    // Set rotor window 1 to V by type U and then clicking forward.
    const rotorWindow2 = screen.getByRole("textbox", {
      name: "rotor window 2",
    }) as HTMLInputElement;
    expect(rotorWindow2).toHaveValue("A");
    await user.dblClick(rotorWindow2);
    await user.keyboard("U");
    expect(rotorWindow2).toHaveValue("U");
    const forwardButtons = screen.getAllByRole("button", { name: "Forward" });
    expect(forwardButtons).toHaveLength(3);
    await user.click(forwardButtons[2]);
    expect(rotorWindow2).toHaveValue("V");

    // Type some plaintext.
    const inputTextField = screen.getByRole("textbox", { name: "Input" });
    await user.type(inputTextField, "steuerejtanafjord");
    expect(inputTextField).toHaveValue("steuerejtanafjord".toUpperCase());

    // Display plaintext in letter groups.
    const groupSwitches = screen.getAllByRole("switch", { name: "Group text" });
    expect(groupSwitches).toHaveLength(2);
    await user.click(groupSwitches[0]);
    expect(inputTextField).toHaveValue("STEUE REJTA NAFJO RD".toUpperCase());

    // Clear input.
    const clearButtons = screen.getAllByRole("button", { name: "Clear" });
    expect(clearButtons).toHaveLength(2);
    await user.click(clearButtons[0]);
    expect(inputTextField).toHaveValue("");

    // Check ciphertext output.
    const outputTextField = screen.getByRole("textbox", { name: "Output" });
    expect(outputTextField).toHaveValue("YKAENZAPMSCHZBFOC");

    // Display ciphertext in letter groups.
    await user.click(groupSwitches[1]);
    expect(outputTextField).toHaveValue("YKAEN ZAPMS CHZBF OC");

    // Clear ciphertext.
    await user.click(clearButtons[1]);
    expect(outputTextField).toHaveValue("");
  });
});
