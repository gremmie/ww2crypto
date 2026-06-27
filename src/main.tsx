import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./app/setupStore.ts";
import { applicationStarted } from "./features/common/actions.ts";
import "@fontsource-variable/roboto/index.css";
import "@fontsource/special-elite/latin.css";
import { EnigmaMachine } from "./features/enigma/machine/enigmaMachine.ts";
import { M209 } from "./features/m209/machine/m209.ts";
import { routeTree } from "./routeTree.gen";

const store = setupStore({ EnigmaMachine, M209 });
store.dispatch(applicationStarted());

export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme} noSsr>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
