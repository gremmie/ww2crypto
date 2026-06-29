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
import { inputTextChanged } from "../../../src/features/m209/m209Slice.ts";
import {
  convertInputText,
  convertInputTextWithAnimation,
  mainAxleRotated,
  resetCounter,
} from "../../../src/features/m209/m209Thunks.ts";

describe("m209Thunks", () => {
  let mockFactory: Mock;
  let mockRotateMainAxle: Mock;
  let mockResetLetterCounter: Mock;
  let mockConvert: Mock;

  beforeEach(() => {
    mockRotateMainAxle = vi.fn();
    mockResetLetterCounter = vi.fn();
    mockConvert = vi.fn().mockReturnValue("X");
    mockFactory = vi.fn().mockReturnValue({
      rotateMainAxle: mockRotateMainAxle,
      resetLetterCounter: mockResetLetterCounter,
      convert: mockConvert,
      wheelPositions: vi.fn().mockReturnValue([1, 2, 3, 4, 5, 6]),
      letterCount: 7,
    });
  });

  const makeStore = () =>
    setupStore({
      EnigmaMachine: class {} as unknown as StoreDependencies["EnigmaMachine"],
      M209: { factory: mockFactory } as unknown as StoreDependencies["M209"],
    });

  describe("mainAxleRotated", () => {
    test("rotates forward and updates wheel positions and counter", async () => {
      const store = makeStore();
      await store.dispatch(mainAxleRotated(1));
      expect(mockRotateMainAxle).toHaveBeenCalledWith(1);
      expect(store.getState().m209.wheelPositions).toEqual([1, 2, 3, 4, 5, 6]);
      expect(store.getState().m209.counter).toBe(7);
    });

    test("rotates backward", async () => {
      const store = makeStore();
      await store.dispatch(mainAxleRotated(-1));
      expect(mockRotateMainAxle).toHaveBeenCalledWith(-1);
      expect(store.getState().m209.wheelPositions).toEqual([1, 2, 3, 4, 5, 6]);
      expect(store.getState().m209.counter).toBe(7);
    });
  });

  describe("resetCounter", () => {
    test("calls resetLetterCounter and updates state from machine", async () => {
      const store = makeStore();
      await store.dispatch(resetCounter());
      expect(mockResetLetterCounter).toHaveBeenCalled();
      expect(store.getState().m209.wheelPositions).toEqual([1, 2, 3, 4, 5, 6]);
      expect(store.getState().m209.counter).toBe(7);
    });
  });

  describe("convertInputText", () => {
    test("passes input text to machine and stores output", async () => {
      mockConvert.mockReturnValue("CIPHER");
      const store = makeStore();
      store.dispatch(inputTextChanged("HELLO"));
      await store.dispatch(convertInputText());
      expect(mockConvert).toHaveBeenCalledWith("HELLO");
      expect(store.getState().m209.outputText).toBe("CIPHER");
      expect(store.getState().m209.wheelPositions).toEqual([1, 2, 3, 4, 5, 6]);
      expect(store.getState().m209.counter).toBe(7);
    });

    test("output accumulates across multiple conversions", async () => {
      mockConvert.mockReturnValueOnce("HELLO ").mockReturnValueOnce("WORLD");
      const store = makeStore();
      store.dispatch(inputTextChanged("FIRST"));
      await store.dispatch(convertInputText());
      store.dispatch(inputTextChanged("SECOND"));
      await store.dispatch(convertInputText());
      expect(store.getState().m209.outputText).toBe("HELLO WORLD");
    });
  });

  describe("convertInputTextWithAnimation", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    test("processes each character in sequence and accumulates outputText", async () => {
      vi.useFakeTimers();
      mockConvert
        .mockReturnValueOnce("A")
        .mockReturnValueOnce("B")
        .mockReturnValueOnce("C");
      const store = makeStore();
      store.dispatch(inputTextChanged("XYZ"));
      const thunkPromise = store.dispatch(convertInputTextWithAnimation());
      await vi.runAllTimersAsync();
      await thunkPromise;
      expect(mockConvert).toHaveBeenCalledTimes(3);
      expect(store.getState().m209.outputText).toBe("ABC");
    });

    test("processes no characters for empty input", async () => {
      vi.useFakeTimers();
      const store = makeStore();
      store.dispatch(inputTextChanged(""));
      const thunkPromise = store.dispatch(convertInputTextWithAnimation());
      await vi.runAllTimersAsync();
      await thunkPromise;
      expect(mockConvert).not.toHaveBeenCalled();
      expect(store.getState().m209.outputText).toBe("");
    });
  });
});
