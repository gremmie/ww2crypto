import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { type JSX, type PropsWithChildren } from "react";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../../src/app/store";
import { setupStore } from "../../src/app/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in.
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    user: userEvent.setup(),
    store: store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

/**
 * Rotates a string to the left or right by a specified number of positions.
 *
 * @param str {string} - The original string.
 * @param k {number} - The number of positions to rotate. Positive for left, negative for right.
 * @returns {string} -The rotated string.
 */
export function rotateString(str: string, k: number): string {
  const n = str.length;

  // Handle cases where k is larger than the string length, ensuring efficient rotation
  // and handling both positive and negative values correctly.
  const rotationIndex = ((k % n) + n) % n;

  if (n === 0) {
    return str;
  }

  // Slice the string into two parts and concatenate them in the rotated order.
  const part1 = str.slice(rotationIndex);
  const part2 = str.slice(0, rotationIndex);

  return part1 + part2;
}
