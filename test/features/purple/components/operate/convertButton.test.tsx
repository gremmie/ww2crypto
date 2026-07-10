import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { ConvertButton } from "../../../../../src/features/purple/components/operate/convertButton.tsx";
import type { RootState } from "../../../../../src/app/setupStore.ts";
import {
  renderWithProviders,
  setupTestStore,
} from "../../../../utils/test-utils.tsx";

// Isolate the button from the thunk internals: replace the two thunk creators
// with spies so we can assert which one is dispatched. purpleSlice depends on
// `machineUpdate` and `processInputText.fulfilled`, so keep those real.
vi.mock(
  "../../../../../src/features/purple/purpleThunks.ts",
  async (importActual) => {
    const actual =
      await importActual<
        typeof import("../../../../../src/features/purple/purpleThunks.ts")
      >();
    return {
      ...actual,
      processInputText: Object.assign(
        vi.fn(() => ({ type: "test/processInputText" })),
        {
          fulfilled: actual.processInputText.fulfilled,
          pending: actual.processInputText.pending,
          rejected: actual.processInputText.rejected,
        },
      ),
      processInputTextWithAnimation: vi.fn(() => ({
        type: "test/processInputTextWithAnimation",
      })),
    };
  },
);

import {
  processInputText,
  processInputTextWithAnimation,
} from "../../../../../src/features/purple/purpleThunks.ts";

const renderButton = (purpleOverrides: Partial<RootState["purple"]> = {}) => {
  const base = setupTestStore().getState().purple;
  const store = setupTestStore({
    preloadedState: { purple: { ...base, ...purpleOverrides } },
  });
  return renderWithProviders(<ConvertButton />, { store });
};

describe("ConvertButton", () => {
  describe("labels", () => {
    test("shows the animated encrypt label by default", () => {
      renderButton();
      expect(
        screen.getByRole("button", { name: "Encrypt" }),
      ).toBeInTheDocument();
    });

    test("shows the Fast label when animation is off", () => {
      renderButton({ animateFlag: false });
      expect(
        screen.getByRole("button", { name: "Fast Encrypt" }),
      ).toBeInTheDocument();
    });

    test("shows decrypt labels in decrypt mode", () => {
      renderButton({ mode: "decrypt" });
      expect(
        screen.getByRole("button", { name: "Decrypt" }),
      ).toBeInTheDocument();

      renderButton({ mode: "decrypt", animateFlag: false });
      expect(
        screen.getByRole("button", { name: "Fast Decrypt" }),
      ).toBeInTheDocument();
    });
  });

  describe("enablement", () => {
    test("is disabled when the input is empty", () => {
      renderButton({ inputText: "" });
      expect(screen.getByRole("button", { name: "Encrypt" })).toBeDisabled();
    });

    test("is enabled with valid input", () => {
      renderButton({ inputText: "HELLO" });
      expect(screen.getByRole("button", { name: "Encrypt" })).toBeEnabled();
    });

    test("is disabled for encrypt input containing a hyphen", () => {
      renderButton({ mode: "encrypt", inputText: "HE-LLO" });
      expect(screen.getByRole("button", { name: "Encrypt" })).toBeDisabled();
    });

    test("allows a hyphen in decrypt mode", () => {
      renderButton({ mode: "decrypt", inputText: "HE-LLO" });
      expect(screen.getByRole("button", { name: "Decrypt" })).toBeEnabled();
    });
  });

  describe("dispatch on click", () => {
    test("dispatches the animated thunk when animation is on", async () => {
      const { user } = renderButton({ inputText: "HELLO", animateFlag: true });

      await user.click(screen.getByRole("button", { name: "Encrypt" }));

      expect(processInputTextWithAnimation).toHaveBeenCalledTimes(1);
      expect(processInputText).not.toHaveBeenCalled();
    });

    test("dispatches the non-animated thunk when animation is off", async () => {
      const { user } = renderButton({ inputText: "HELLO", animateFlag: false });

      await user.click(screen.getByRole("button", { name: "Fast Encrypt" }));

      expect(processInputText).toHaveBeenCalledTimes(1);
      expect(processInputTextWithAnimation).not.toHaveBeenCalled();
    });
  });

  describe("style menu", () => {
    test("selecting the other style toggles the animate flag and label", async () => {
      const { store, user } = renderButton({ inputText: "HELLO" });
      expect(store.getState().purple.animateFlag).toBe(true);

      await user.click(
        screen.getByRole("button", { name: "select processing style" }),
      );
      await user.click(
        await screen.findByRole("menuitem", { name: "Fast Encrypt" }),
      );

      expect(store.getState().purple.animateFlag).toBe(false);
      expect(
        screen.getByRole("button", { name: "Fast Encrypt" }),
      ).toBeInTheDocument();
    });

    test("selecting the already-selected style does not toggle", async () => {
      const { store, user } = renderButton({ inputText: "HELLO" });

      await user.click(
        screen.getByRole("button", { name: "select processing style" }),
      );
      await user.click(
        await screen.findByRole("menuitem", { name: "Encrypt" }),
      );

      expect(store.getState().purple.animateFlag).toBe(true);
    });
  });
});
