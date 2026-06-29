import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, type Mock, test, vi } from "vitest";

import {
  type RootState,
  setupStore,
} from "../../../../../src/app/setupStore.ts";
import type { StoreDependencies } from "../../../../../src/app/storeDependencies.ts";
import { OperateView } from "../../../../../src/features/m209/components/operate/operateView.tsx";
import { renderWithProviders } from "../../../../utils/test-utils.tsx";

describe("operateView", () => {
  let mockM209: never;
  let mockRotateMainAxle: Mock;
  let mockResetCounter: Mock;
  let mockConvert: Mock;

  beforeEach(() => {
    mockRotateMainAxle = vi.fn();
    mockResetCounter = vi.fn();
    mockConvert = vi.fn();
    mockConvert.mockReturnValue("MYSTERY");
    mockM209 = {
      factory: vi.fn().mockReturnValue({
        rotateMainAxle: mockRotateMainAxle,
        resetLetterCounter: mockResetCounter,
        convert: mockConvert,
        wheelPositions: vi.fn().mockReturnValue([0, 1, 2, 3, 4, 5]),
        letterCount: 42,
      }),
    } as never;
  });

  const setupTestStore = (preloadedState?: Partial<RootState>) => {
    const deps: StoreDependencies = {
      EnigmaMachine: class {} as unknown as StoreDependencies["EnigmaMachine"],
      M209: mockM209,
    };
    return setupStore(deps, preloadedState);
  };

  test("can rotate main axle forward", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    const forwards = screen.getAllByRole("button", { name: "Forward" });
    expect(forwards).toHaveLength(7);
    const axleForward = forwards[6]!;
    await user.click(axleForward);

    expect(mockRotateMainAxle).toHaveBeenCalledWith(1);
    expect(store.getState().m209.wheelPositions).toEqual([0, 1, 2, 3, 4, 5]);
    expect(store.getState().m209.counter).toBe(42);
  });

  test("can rotate main axle backward", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    const backwards = screen.getAllByRole("button", { name: "Back" });
    expect(backwards).toHaveLength(7);
    const axleBackward = backwards[6]!;
    await user.click(axleBackward);

    expect(mockRotateMainAxle).toHaveBeenCalledWith(-1);
    expect(store.getState().m209.wheelPositions).toEqual([0, 1, 2, 3, 4, 5]);
    expect(store.getState().m209.counter).toBe(42);
  });

  test("reset counter", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    // Initially counter is at 0000, so reset button is disabled.
    const resetButton = screen.getByRole("button", { name: "reset" });
    expect(resetButton).toBeDisabled();

    // Move main axle.
    const backwards = screen.getAllByRole("button", { name: "Back" });
    expect(backwards).toHaveLength(7);
    const axleBackward = backwards[6]!;
    await user.click(axleBackward);

    // Reset should be enabled now.
    expect(resetButton).toBeEnabled();
    await user.click(resetButton);

    expect(mockResetCounter).toHaveBeenCalled();
    expect(store.getState().m209.wheelPositions).toEqual([0, 1, 2, 3, 4, 5]);
    expect(store.getState().m209.counter).toBe(42);
  });

  test("convert text", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    const input = screen.getByRole("textbox", { name: "Input" });
    await user.type(input, "TEST");

    const convertDropdown = screen.getByRole("button", {
      name: "select convert style",
    });
    await user.click(convertDropdown);
    const fastMenuItem = screen.getByRole("menuitem", { name: "Fast Convert" });
    await user.click(fastMenuItem);
    const fastButton = screen.getByRole("button", { name: "Fast Convert" });
    await user.click(fastButton);

    expect(store.getState().m209.wheelPositions).toEqual([0, 1, 2, 3, 4, 5]);
    expect(store.getState().m209.counter).toBe(42);
    expect(store.getState().m209.outputText).toBe("MYSTERY");
  });

  test("convert text with animation", async () => {
    const store = setupTestStore();
    const { user } = renderWithProviders(<OperateView />, { store });

    const input = screen.getByRole("textbox", { name: "Input" });
    await user.type(input, "HI");

    const convert = screen.getByRole("button", { name: "Convert" });
    await user.click(convert);

    expect(store.getState().m209.wheelPositions).toEqual([0, 1, 2, 3, 4, 5]);
    expect(store.getState().m209.counter).toBe(42);
    expect(store.getState().m209.outputText).toBe("MYSTERY");
  });

  describe("can change key wheels", () => {
    test("with rotation", async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<OperateView />, { store });

      const forwards = screen.getAllByRole("button", { name: "Forward" });
      expect(forwards).toHaveLength(7);
      for (let i = 0; i < 6; ++i) {
        await user.click(forwards[i]!);
      }
      expect(store.getState().m209.wheelPositions).toEqual([1, 1, 1, 1, 1, 1]);

      const backwards = screen.getAllByRole("button", { name: "Back" });
      expect(backwards).toHaveLength(7);
      for (let i = 0; i < 6; ++i) {
        await user.click(backwards[i]!);
        await user.click(backwards[i]!);
      }
      expect(store.getState().m209.wheelPositions).toEqual([
        25, 24, 22, 20, 18, 16,
      ]);
    });

    test("by typing", async () => {
      const store = setupTestStore();
      const { user } = renderWithProviders(<OperateView />, { store });

      const inputs = screen.getAllByRole("textbox", {
        name: /^Key wheel [0-5]$/,
      });
      expect(inputs).toHaveLength(6);
      const aCode = "A".charCodeAt(0);
      for (let i = 0; i < 6; ++i) {
        await user.type(inputs[i]!, String.fromCharCode(aCode + i + 1));
      }
      expect(store.getState().m209.wheelPositions).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
