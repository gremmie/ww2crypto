import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom";

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
});
