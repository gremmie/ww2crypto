import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./app/store";
import { applicationStarted } from "./features/common/actions.ts";
import { MainApp } from "./features/main/mainApp.tsx";

const store = setupStore();
store.dispatch(applicationStarted());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <MainApp />
    </Provider>
  </StrictMode>,
);
