import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/setupStore.ts";
import { playClickSound } from "../actions.ts";

const click = new Audio("/audio/click.mp3");

export const audioMiddleware: Middleware<object, RootState> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_storeApi) => (next) => async (action) => {
    if (playClickSound.match(action)) {
      click.currentTime = 0;
      await click.play();
    }
    return next(action);
  };
