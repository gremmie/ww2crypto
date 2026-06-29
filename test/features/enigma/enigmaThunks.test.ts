import type { Middleware } from "@reduxjs/toolkit";
import { afterEach, beforeEach, describe, expect, type Mock, test, vi } from "vitest";

vi.mock("../../../src/features/common/middleware/audioMiddleware.ts", () => ({
  audioMiddleware: (() => {
    const middleware: Middleware<object, RootState> =
      () => (next) => (action) => next(action);
    return middleware;
  })(),
}));

import { type RootState, setupStore } from "../../../src/app/setupStore.ts";
import type { StoreDependencies } from "../../../src/app/storeDependencies.ts";
import {
  lampPanelOpenStatusChanged,
  reflectorChanged,
  ringSettingChanged,
  rotorTypeChanged,
} from "../../../src/features/enigma/enigmaSlice.ts";
import {
  operatorKeyPressed,
  operatorSentBulkText,
} from "../../../src/features/enigma/enigmaThunks.ts";

describe("enigmaThunks", () => {
  let mockKeyPress: Mock;
  let mockGetDisplay: Mock;
  let mockProcessText: Mock;
  let MockEnigmaMachine: Mock;

  beforeEach(() => {
    mockKeyPress = vi.fn().mockReturnValue("X");
    mockGetDisplay = vi.fn().mockReturnValue("AAA");
    mockProcessText = vi.fn().mockReturnValue("XXX");
    MockEnigmaMachine = vi.fn().mockImplementation(function () {
      return {
        setDisplay: vi.fn(),
        keyPress: mockKeyPress,
        getDisplay: mockGetDisplay,
        processText: mockProcessText,
      };
    });
  });

  const makeStore = () =>
    setupStore({
      EnigmaMachine:
        MockEnigmaMachine as unknown as StoreDependencies["EnigmaMachine"],
      M209: class {} as unknown as StoreDependencies["M209"],
    });

  // Dispatches the minimum setup needed for buildEnigmaFromState to succeed.
  const configureEnigma = (store: ReturnType<typeof makeStore>) => {
    store.dispatch(reflectorChanged("B"));
    store.dispatch(rotorTypeChanged({ position: 0, rotorType: "I" }));
    store.dispatch(rotorTypeChanged({ position: 1, rotorType: "II" }));
    store.dispatch(rotorTypeChanged({ position: 2, rotorType: "III" }));
    store.dispatch(ringSettingChanged({ position: 0, ringSetting: 0 }));
    store.dispatch(ringSettingChanged({ position: 1, ringSetting: 0 }));
    store.dispatch(ringSettingChanged({ position: 2, ringSetting: 0 }));
  };

  describe("operatorKeyPressed", () => {
    test("ignores lowercase letters", async () => {
      const store = makeStore();
      configureEnigma(store);
      await store.dispatch(operatorKeyPressed("a"));
      expect(mockKeyPress).not.toHaveBeenCalled();
      expect(store.getState().enigma.inputText).toBe("");
    });

    test("ignores digits and symbols", async () => {
      const store = makeStore();
      configureEnigma(store);
      await store.dispatch(operatorKeyPressed("1"));
      await store.dispatch(operatorKeyPressed(" "));
      expect(mockKeyPress).not.toHaveBeenCalled();
    });

    test("does nothing when machine is not fully configured", async () => {
      const store = makeStore(); // reflector and rotors not set
      await store.dispatch(operatorKeyPressed("A"));
      expect(mockKeyPress).not.toHaveBeenCalled();
      expect(store.getState().enigma.inputText).toBe("");
    });

    test("calls keyPress and updates inputText, outputText, and activeLamp", async () => {
      mockKeyPress.mockReturnValue("Y");
      const store = makeStore();
      configureEnigma(store);
      await store.dispatch(operatorKeyPressed("A"));
      expect(mockKeyPress).toHaveBeenCalledWith("A");
      expect(store.getState().enigma.inputText).toBe("A");
      expect(store.getState().enigma.outputText).toBe("Y");
      expect(store.getState().enigma.activeLamp).toBe("Y");
    });

    test("updates rotor displays from machine.getDisplay() after key press", async () => {
      mockGetDisplay.mockReturnValue("ABZ");
      const store = makeStore();
      configureEnigma(store);
      await store.dispatch(operatorKeyPressed("A"));
      expect(store.getState().enigma.rotorDisplays).toEqual(["A", "B", "Z"]);
    });

    test("accumulates inputText and outputText across multiple key presses", async () => {
      mockKeyPress.mockReturnValueOnce("Y").mockReturnValueOnce("Z");
      const store = makeStore();
      configureEnigma(store);
      await store.dispatch(operatorKeyPressed("A"));
      await store.dispatch(operatorKeyPressed("B"));
      expect(store.getState().enigma.inputText).toBe("AB");
      expect(store.getState().enigma.outputText).toBe("YZ");
    });
  });

  describe("operatorSentBulkText", () => {
    test("does nothing when machine is not fully configured", async () => {
      const store = makeStore();
      await store.dispatch(operatorSentBulkText("ABC"));
      expect(mockProcessText).not.toHaveBeenCalled();
      expect(mockKeyPress).not.toHaveBeenCalled();
      expect(store.getState().enigma.inputText).toBe("");
    });

    describe("lamp panel closed", () => {
      test("processes entire text at once via processText", async () => {
        mockProcessText.mockReturnValue("XYZ");
        const store = makeStore();
        configureEnigma(store);
        store.dispatch(lampPanelOpenStatusChanged(false));
        await store.dispatch(operatorSentBulkText("ABC"));
        expect(mockProcessText).toHaveBeenCalledWith("ABC");
        expect(mockKeyPress).not.toHaveBeenCalled();
        expect(store.getState().enigma.inputText).toBe("ABC");
        expect(store.getState().enigma.outputText).toBe("XYZ");
      });
    });

    describe("lamp panel open", () => {
      afterEach(() => {
        vi.useRealTimers();
      });

      test("processes each character individually via keyPress", async () => {
        vi.useFakeTimers();
        mockKeyPress
          .mockReturnValueOnce("X")
          .mockReturnValueOnce("Y")
          .mockReturnValueOnce("Z");
        const store = makeStore();
        configureEnigma(store);
        // isLampPanelOpen is true by default
        const thunkPromise = store.dispatch(operatorSentBulkText("ABC"));
        await vi.runAllTimersAsync();
        await thunkPromise;
        expect(mockKeyPress).toHaveBeenCalledTimes(3);
        expect(mockKeyPress).toHaveBeenNthCalledWith(1, "A");
        expect(mockKeyPress).toHaveBeenNthCalledWith(2, "B");
        expect(mockKeyPress).toHaveBeenNthCalledWith(3, "C");
        expect(store.getState().enigma.inputText).toBe("ABC");
        expect(store.getState().enigma.outputText).toBe("XYZ");
      });

      test("does not call processText", async () => {
        vi.useFakeTimers();
        const store = makeStore();
        configureEnigma(store);
        const thunkPromise = store.dispatch(operatorSentBulkText("A"));
        await vi.runAllTimersAsync();
        await thunkPromise;
        expect(mockProcessText).not.toHaveBeenCalled();
      });

      test("clears activeLamp after each character via operatorKeyReleased", async () => {
        vi.useFakeTimers();
        mockKeyPress.mockReturnValue("Q");
        const store = makeStore();
        configureEnigma(store);
        const thunkPromise = store.dispatch(operatorSentBulkText("A"));
        await vi.runAllTimersAsync();
        await thunkPromise;
        expect(store.getState().enigma.activeLamp).toBe("");
      });
    });
  });
});
