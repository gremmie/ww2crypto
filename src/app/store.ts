import { combineReducers, configureStore } from "@reduxjs/toolkit";
import enigmaReducer from "../features/enigma/enigmaSlice";

// Create the root reducer separately so we can extract the RootState type.
const rootReducer = combineReducers({
  enigma: enigmaReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
