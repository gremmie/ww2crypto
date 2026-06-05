import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { WheelSetup } from "../../../../../src/features/m209/components/setup/wheelSetup.tsx";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../../utils/test-utils.tsx";

describe("WheelSetup", () => {
  const expectPins = (pins: string) => {
    expect(screen.getAllByRole("switch")).toHaveLength(pins.length);
    for (const pin of pins) {
      expect(screen.getByRole("switch", { name: pin })).toBeInTheDocument();
    }
  };

  test("Expected controls are present", () => {
    const store = setupTestStore();
    renderWithProviders(<WheelSetup />, { store });

    const wheelToggleButtons = screen.getAllByRole("button", {
      name: /wheel [123456]/,
    });
    expect(wheelToggleButtons).toHaveLength(6);
    expect(wheelToggleButtons[0]).toBePressed();
    expect(wheelToggleButtons[1]).not.toBePressed();
    expect(wheelToggleButtons[2]).not.toBePressed();
    expect(wheelToggleButtons[3]).not.toBePressed();
    expect(wheelToggleButtons[4]).not.toBePressed();
    expect(wheelToggleButtons[5]).not.toBePressed();

    const status = screen.getByLabelText("Wheel 1 Effective Pins");
    expect(status).toHaveValue("");

    const bulkSetInput = screen.getByLabelText("Bulk Set Pins");
    expect(bulkSetInput).toHaveValue("");

    const bulkSetButton = screen.getByRole("button", { name: "Bulk Set Pins" });
    expect(bulkSetButton).toBeDisabled();
    const resetPinsButton = screen.getByRole("button", {
      name: "Reset All Pins",
    });
    expect(resetPinsButton).toBeDisabled();

    const rollBackButton = screen.getByLabelText("roll wheel back");
    expect(rollBackButton).toBeEnabled();

    expectPins("YZABC");

    const rollForwardButton = screen.getByLabelText("roll wheel forward");
    expect(rollForwardButton).toBeEnabled();
  });

  test("Wheel 1 can be rolled", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<WheelSetup />, { store });

    const rollBackButton = screen.getByLabelText("roll wheel back");
    expect(rollBackButton).toBeEnabled();

    expectPins("YZABC");

    const rollForwardButton = screen.getByLabelText("roll wheel forward");
    expect(rollForwardButton).toBeEnabled();

    await user.click(rollBackButton);
    expectPins("XYZAB");
    await user.click(rollBackButton);
    expectPins("WXYZA");

    await user.click(rollForwardButton);
    expectPins("XYZAB");
    await user.click(rollForwardButton);
    expectPins("YZABC");
    await user.click(rollForwardButton);
    expectPins("ZABCD");
  });

  test("Wheel 2 can be rolled", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<WheelSetup />, { store });

    const wheel2Select = screen.getByRole("button", { name: "wheel 2" });
    await user.click(wheel2Select);

    const rollBackButton = screen.getByLabelText("roll wheel back");
    const rollForwardButton = screen.getByLabelText("roll wheel forward");

    expectPins("YZABC");

    await user.click(rollBackButton);
    expectPins("XYZAB");
    await user.click(rollBackButton);
    expectPins("VXYZA");

    await user.click(rollForwardButton);
    expectPins("XYZAB");
    await user.click(rollForwardButton);
    expectPins("YZABC");
    await user.click(rollForwardButton);
    expectPins("ZABCD");
  });

  test("Wheel 3 can be rolled", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<WheelSetup />, { store });

    const wheel3Select = screen.getByRole("button", { name: "wheel 3" });
    await user.click(wheel3Select);

    const rollBackButton = screen.getByLabelText("roll wheel back");
    const rollForwardButton = screen.getByLabelText("roll wheel forward");

    expectPins("VXABC");

    await user.click(rollBackButton);
    expectPins("UVXAB");
    await user.click(rollBackButton);
    expectPins("TUVXA");

    await user.click(rollForwardButton);
    expectPins("UVXAB");
    await user.click(rollForwardButton);
    expectPins("VXABC");
    await user.click(rollForwardButton);
    expectPins("XABCD");
  });

  test("Wheel 4 can be rolled", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<WheelSetup />, { store });

    const wheel4Select = screen.getByRole("button", { name: "wheel 4" });
    await user.click(wheel4Select);

    const rollBackButton = screen.getByLabelText("roll wheel back");
    const rollForwardButton = screen.getByLabelText("roll wheel forward");

    expectPins("TUABC");

    await user.click(rollBackButton);
    expectPins("STUAB");
    await user.click(rollBackButton);
    expectPins("RSTUA");

    await user.click(rollForwardButton);
    expectPins("STUAB");
    await user.click(rollForwardButton);
    expectPins("TUABC");
    await user.click(rollForwardButton);
    expectPins("UABCD");
  });

  test("Wheel 5 can be rolled", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<WheelSetup />, { store });

    const wheel5Select = screen.getByRole("button", { name: "wheel 5" });
    await user.click(wheel5Select);

    const rollBackButton = screen.getByLabelText("roll wheel back");
    const rollForwardButton = screen.getByLabelText("roll wheel forward");

    expectPins("RSABC");

    await user.click(rollBackButton);
    expectPins("QRSAB");
    await user.click(rollBackButton);
    expectPins("PQRSA");

    await user.click(rollForwardButton);
    expectPins("QRSAB");
    await user.click(rollForwardButton);
    expectPins("RSABC");
    await user.click(rollForwardButton);
    expectPins("SABCD");
  });

  test("Wheel 6 can be rolled", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<WheelSetup />, { store });

    const wheel6Select = screen.getByRole("button", { name: "wheel 6" });
    await user.click(wheel6Select);

    const rollBackButton = screen.getByLabelText("roll wheel back");
    const rollForwardButton = screen.getByLabelText("roll wheel forward");

    expectPins("PQABC");

    await user.click(rollBackButton);
    expectPins("OPQAB");
    await user.click(rollBackButton);
    expectPins("NOPQA");

    await user.click(rollForwardButton);
    expectPins("OPQAB");
    await user.click(rollForwardButton);
    expectPins("PQABC");
    await user.click(rollForwardButton);
    expectPins("QABCD");
  });

  for (let i = 0; i < 6; ++i) {
    test(`Wheel ${i + 1} - setting pins updates status`, async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<WheelSetup />, { store });

      const wheelSelect = screen.getByRole("button", {
        name: `wheel ${i + 1}`,
      });
      await user.click(wheelSelect);

      await user.click(screen.getByRole("switch", { name: "A" }));
      await user.click(screen.getByRole("switch", { name: "B" }));
      await user.click(screen.getByRole("switch", { name: "C" }));

      const status = screen.getByLabelText(`Wheel ${i + 1} Effective Pins`);
      expect(status).toHaveValue("ABC");
    });

    test(`Wheel ${i + 1} - can bulk set pins`, async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<WheelSetup />, { store });

      const wheelSelect = screen.getByRole("button", {
        name: `wheel ${i + 1}`,
      });
      await user.click(wheelSelect);

      const bulkSetInput = screen.getByLabelText("Bulk Set Pins");
      await user.click(bulkSetInput);
      await user.type(bulkSetInput, "ABCD");
      const bulkSet = screen.getByRole("button", { name: "Bulk Set Pins" });
      await user.click(bulkSet);

      const status = screen.getByLabelText(`Wheel ${i + 1} Effective Pins`);
      expect(status).toHaveValue("ABCD");

      const resetButton = screen.getByRole("button", {
        name: "Reset All Pins",
      });
      expect(resetButton).toBeEnabled();
      await user.click(resetButton);
      expect(status).toHaveValue("");
    });
  }
});
