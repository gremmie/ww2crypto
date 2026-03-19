import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { configMiddleware } from "../features/config/configMiddleware.ts";
import configReducer from "../features/config/configSlice";
import enigmaReducer from "../features/enigma/enigmaSlice";
import { storageMiddleware } from "../features/enigma/middleware/storageMiddleware.ts";
import m209Reducer from "../features/m209/m209Slice";

// Create the root reducer separately so we can extract the RootState type.
const rootReducer = combineReducers({
  enigma: enigmaReducer,
  config: configReducer,
  m209: m209Reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(storageMiddleware, configMiddleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
