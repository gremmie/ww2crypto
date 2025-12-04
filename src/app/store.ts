import { configureStore } from "@reduxjs/toolkit";
import enigmaReducer from "../features/enigma/enigmaSlice";

export const store = configureStore({
  reducer: {
    enigma: enigmaReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
