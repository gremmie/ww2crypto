import { screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import DrumSetup from "../../../../../src/features/m209/components/setup/drumSetup.tsx";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../../utils/test-utils.tsx";

// Pointer events aren't supported in the JSDOM environment used for testing.
// This causes errors when the DrumSetup component tries to use the lug sliders.
// This setup block mocks the necessary PointerEvent functionality to allow the
// tests to run without errors.
beforeAll(() => {
  if (typeof window !== "undefined") {
    // Mock the PointerEvent constructor if it's missing
    if (!window.PointerEvent) {
      class PointerEvent extends MouseEvent {
        constructor(type: string, params: PointerEventInit = {}) {
          super(type, params);
        }
      }
      window.PointerEvent = PointerEvent as never;
    }

    // Patch the HTMLElement prototype
    Object.assign(HTMLElement.prototype, {
      setPointerCapture: () => {},
      releasePointerCapture: () => {},
      hasPointerCapture: () => false,
    });
  }
});

describe("DrumSetup", () => {
  test("Expected controls present", () => {
    const store = setupTestStore();

    renderWithProviders(<DrumSetup />, { store });
    const settingsDisplay = screen.getByLabelText<HTMLInputElement>(
      "Current Lug Settings",
    );
    expect(settingsDisplay).toHaveValue("");
    const bulkSetInput =
      screen.getByLabelText<HTMLInputElement>("Bulk Set Lugs");
    expect(bulkSetInput).toHaveValue("");
    const bulkSetLugs = screen.getByRole("button", { name: "Bulk Set Lugs" });
    expect(bulkSetLugs).toBeDisabled();
    const resetAllLugs = screen.getByRole("button", { name: "Reset All Lugs" });
    expect(resetAllLugs).toBeDisabled();
    const sortLugs = screen.getByRole("button", { name: "Sort Lugs" });
    expect(sortLugs).toBeDisabled();

    const rollBackButtons = screen.getAllByLabelText("roll drum back");
    expect(rollBackButtons).toHaveLength(2);
    expect(rollBackButtons[0]).toBeEnabled();

    const rollForwardButtons = screen.getAllByLabelText("roll drum forward");
    expect(rollForwardButtons).toHaveLength(2);
    expect(rollForwardButtons[0]).toBeEnabled();
  });

  test("Drum can be rolled", async () => {
    const store = setupTestStore();

    const { user } = renderWithProviders(<DrumSetup />, { store });

    const rollBackButtons = screen.getAllByLabelText("roll drum back");
    if (rollBackButtons.length !== 2) {
      expect.fail("Unexpected number of back buttons");
    }
    const rollForwardButtons = screen.getAllByLabelText("roll drum forward");
    if (rollForwardButtons.length !== 2) {
      expect.fail("Unexpected number of forward buttons");
    }

    const expectBars = (barIds: number[]) => {
      expect(screen.getAllByRole("slider")).toHaveLength(barIds.length * 2);
      for (const barId of barIds) {
        expect(
          screen.getByRole("slider", { name: `bar ${barId} left lug` }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("slider", { name: `bar ${barId} right lug` }),
        ).toBeInTheDocument();
      }
    };
    expectBars([1, 2, 3, 4]);

    const topBackButton = rollBackButtons[0];
    if (!topBackButton) {
      expect.fail("Missing top back button");
    }
    await user.click(topBackButton);
    expectBars([27, 1, 2, 3]);
    await user.click(topBackButton);
    expectBars([26, 27, 1, 2]);

    const topForwardButton = rollForwardButtons[0];
    if (!topForwardButton) {
      expect.fail("Missing top forward button");
    }

    await user.click(topForwardButton);
    expectBars([27, 1, 2, 3]);
    await user.click(topForwardButton);
    expectBars([1, 2, 3, 4]);

    const bottomForwardButton = rollForwardButtons[1];
    if (!bottomForwardButton) {
      expect.fail("Missing bottom forward button");
    }
    await user.click(bottomForwardButton);
    expectBars([2, 3, 4, 5]);
    await user.click(bottomForwardButton);
    expectBars([3, 4, 5, 6]);

    const bottomBackButton = rollBackButtons[1];
    if (!bottomBackButton) {
      expect.fail("Missing bottom back button");
    }
    await user.click(bottomBackButton);
    expectBars([2, 3, 4, 5]);
    await user.click(bottomBackButton);
    expectBars([1, 2, 3, 4]);
  });

  test("Changing lug sliders updates state", async () => {
    const store = setupTestStore();

    const { user } = renderWithProviders(<DrumSetup />, { store });

    const drum4LeftLug = screen.getByRole("slider", {
      name: "bar 4 left lug",
    });
    const drum4RightLug = screen.getByRole("slider", {
      name: "bar 4 right lug",
    });

    await waitFor(async () => {
      drum4LeftLug.focus();
      await user.keyboard("{ArrowLeft}");
      drum4RightLug.focus();
      await user.keyboard("{ArrowRight}");

      const status = screen.getByLabelText("Current Lug Settings");
      expect(status).toHaveValue("1-6");
    });

    const drum1LeftLug = screen.getByRole("slider", {
      name: "bar 1 left lug",
    });
    const drum1RightLug = screen.getByRole("slider", {
      name: "bar 1 right lug",
    });

    await waitFor(async () => {
      drum1LeftLug.focus();
      await user.keyboard("{ArrowRight}");
      await user.keyboard("{ArrowRight}");
      drum1RightLug.focus();
      await user.keyboard("{ArrowLeft}");

      const status = screen.getByLabelText("Current Lug Settings");
      expect(status).toHaveValue("3-5 1-6");
    });
  });

  test("Can bulk set lugs, sort, and reset", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<DrumSetup />, { store });

    const status = screen.getByLabelText("Current Lug Settings");
    expect(status).toHaveValue("");
    const bulkSetInput = screen.getByLabelText("Bulk Set Lugs");
    expect(bulkSetInput).toHaveValue("");
    const bulkSetButton = screen.getByRole("button", { name: "Bulk Set Lugs" });
    expect(bulkSetButton).toBeDisabled();
    const sortButton = screen.getByRole("button", { name: "Sort Lugs" });
    expect(sortButton).toBeDisabled();
    const resetButton = screen.getByRole("button", { name: "Reset All Lugs" });
    expect(resetButton).toBeDisabled();

    await user.click(bulkSetInput);
    await user.type(
      bulkSetInput,
      "0-4*7 0-5*2 0-6*2 1-0 2-0 2-4*2 3-0*9 3-4 4-6*2",
    );
    expect(bulkSetButton).toBeEnabled();
    await user.click(bulkSetButton);
    expect(status).toHaveValue(
      "0-4*7 0-5*2 0-6*2 1-0 2-0 2-4*2 3-0*9 3-4 4-6*2",
    );
    expect(bulkSetInput).toHaveValue("");
    expect(bulkSetButton).toBeDisabled();

    expect(sortButton).toBeDisabled();

    await user.click(bulkSetInput);
    await user.type(
      bulkSetInput,
      "2-0 1-0 0-4*7 0-5*2 0-6*2 2-4*2 3-0*9 3-4 4-6*2",
    );
    expect(bulkSetButton).toBeEnabled();
    await user.click(bulkSetButton);
    expect(status).toHaveValue(
      "2-0 1-0 0-4*7 0-5*2 0-6*2 2-4*2 3-0*9 3-4 4-6*2",
    );
    expect(sortButton).toBeEnabled();
    await user.click(sortButton);
    expect(status).toHaveValue(
      "0-4*7 0-5*2 0-6*2 1-0 2-0 2-4*2 3-0*9 3-4 4-6*2",
    );

    expect(resetButton).toBeEnabled();
    await user.click(resetButton);
    expect(status).toHaveValue("");
    expect(resetButton).toBeDisabled();
  });
});
