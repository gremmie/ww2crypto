import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom";

// Node 22+ exposes a global `localStorage` (experimental Web Storage) that is a
// non-functional empty object unless started with `--localstorage-file <path>`.
// Because it already exists on globalThis, vitest's jsdom environment leaves it
// in place rather than overlaying jsdom's working Storage, so any test touching
// localStorage silently gets an object with no setItem/getItem. Install a small
// in-memory implementation so ConfigStorage (and anything else) works in tests.
function installLocalStorageMock() {
  let store: Record<string, string> = {};
  const mock: Storage = {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  };
  Object.defineProperty(window, "localStorage", {
    value: mock,
    configurable: true,
    writable: true,
  });
}
installLocalStorageMock();

// jsdom does not implement HTMLMediaElement.play(). Mock Audio globally so that
// audioMiddleware's module-level `new Audio(...)` captures a no-op instance.
window.Audio = vi.fn().mockImplementation(function () {
  return {
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    currentTime: 0,
    volume: 1,
    loop: false,
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  window.localStorage.clear();
});
