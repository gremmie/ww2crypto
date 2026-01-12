import { combineReducers, configureStore } from "@reduxjs/toolkit";
import enigmaReducer from "../features/enigma/enigmaSlice";
import { storageMiddleware } from "../features/enigma/middleware/storageMiddleware.ts";

// Create the root reducer separately so we can extract the RootState type.
const rootReducer = combineReducers({
  enigma: enigmaReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(storageMiddleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
