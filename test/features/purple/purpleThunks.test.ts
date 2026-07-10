import {
  afterEach,
  beforeEach,
  describe,
  expect,
  type Mock,
  test,
  vi,
} from "vitest";

import { setupStore, type RootState } from "../../../src/app/setupStore.ts";
import type { StoreDependencies } from "../../../src/app/storeDependencies.ts";
import {
  processInputText,
  processInputTextWithAnimation,
} from "../../../src/features/purple/purpleThunks.ts";

describe("purpleThunks", () => {
  let processText: Mock;
  let switchPositions: Mock;
  let ctorArgs: unknown[];

  beforeEach(() => {
    processText = vi.fn().mockReturnValue("");
    switchPositions = vi.fn().mockReturnValue([1, 2, 3, 4]);
    ctorArgs = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // A mock Purple whose constructor records its options and whose methods are
  // the shared spies above. setupTestStore hardcodes an empty Purple stub, so
  // we build the store with setupStore directly (like m209Thunks).
  const makeStore = (purpleOverrides: Partial<RootState["purple"]> = {}) => {
    class MockPurple {
      processText = processText;
      switchPositions = switchPositions;
      constructor(arg: unknown) {
        ctorArgs.push(arg);
      }
    }
    const deps: StoreDependencies = {
      EnigmaMachine: class {} as unknown as StoreDependencies["EnigmaMachine"],
      M209: { factory: vi.fn() } as unknown as StoreDependencies["M209"],
      Purple: MockPurple as unknown as StoreDependencies["Purple"],
    };
    const base = setupStore(deps).getState().purple;
    return setupStore(deps, { purple: { ...base, ...purpleOverrides } });
  };

  describe("processInputText", () => {
    test("constructs the machine from current state and processes the whole input", async () => {
      const store = makeStore({
        switchPositions: [5, 6, 7, 8],
        switchOrder: "3-2-1",
        plugboard: "BEIOUYACDFGHJKLMNPQRSTVWXZ",
        mode: "decrypt",
        inputText: "XYZ",
      });

      await store.dispatch(processInputText());

      expect(ctorArgs).toEqual([
        {
          switchPositions: [5, 6, 7, 8],
          switchOrder: "3-2-1",
          plugboard: "BEIOUYACDFGHJKLMNPQRSTVWXZ",
          mode: "decrypt",
        },
      ]);
      expect(processText).toHaveBeenCalledWith("XYZ");
    });

    test("stores the machine output and updated switch positions on fulfilled", async () => {
      processText.mockReturnValue("HELLO");
      switchPositions.mockReturnValue([9, 9, 9, 9]);
      const store = makeStore({ inputText: "abc" });

      await store.dispatch(processInputText());

      expect(store.getState().purple.outputText).toBe("HELLO");
      expect(store.getState().purple.switchPositions).toEqual([9, 9, 9, 9]);
    });

    test("outputText accumulates across multiple dispatches", async () => {
      processText.mockReturnValueOnce("AB").mockReturnValueOnce("CD");
      const store = makeStore();

      await store.dispatch(processInputText());
      await store.dispatch(processInputText());

      expect(store.getState().purple.outputText).toBe("ABCD");
    });
  });

  describe("processInputTextWithAnimation", () => {
    const runAnimation = async (store: ReturnType<typeof makeStore>) => {
      vi.useFakeTimers();
      const thunkPromise = store.dispatch(processInputTextWithAnimation());
      await vi.runAllTimersAsync();
      await thunkPromise;
    };

    test("processes each character in order", async () => {
      const store = makeStore({ inputText: "XYZ" });

      await runAnimation(store);

      expect(processText).toHaveBeenCalledTimes(3);
      expect(processText).toHaveBeenNthCalledWith(1, "X");
      expect(processText).toHaveBeenNthCalledWith(2, "Y");
      expect(processText).toHaveBeenNthCalledWith(3, "Z");
    });

    test("accumulates each character's output into outputText", async () => {
      processText
        .mockReturnValueOnce("A")
        .mockReturnValueOnce("B")
        .mockReturnValueOnce("C");
      const store = makeStore({ inputText: "XYZ" });

      await runAnimation(store);

      expect(store.getState().purple.outputText).toBe("ABC");
    });

    test("switch positions reflect the machine after the final character", async () => {
      switchPositions
        .mockReturnValueOnce([1, 1, 1, 1])
        .mockReturnValueOnce([2, 2, 2, 2])
        .mockReturnValueOnce([3, 3, 3, 3]);
      const store = makeStore({ inputText: "XYZ" });

      await runAnimation(store);

      expect(store.getState().purple.switchPositions).toEqual([3, 3, 3, 3]);
    });

    test("constructs the machine once from state, not per character", async () => {
      const store = makeStore({
        switchPositions: [5, 6, 7, 8],
        switchOrder: "2-1-3",
        plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
        mode: "encrypt",
        inputText: "XYZ",
      });

      await runAnimation(store);

      expect(ctorArgs).toEqual([
        {
          switchPositions: [5, 6, 7, 8],
          switchOrder: "2-1-3",
          plugboard: "AEIOUYBCDFGHJKLMNPQRSTVWXZ",
          mode: "encrypt",
        },
      ]);
    });

    test("does nothing for empty input", async () => {
      const store = makeStore({ inputText: "" });

      await runAnimation(store);

      expect(processText).not.toHaveBeenCalled();
      expect(store.getState().purple.outputText).toBe("");
    });
  });
});
