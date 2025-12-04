import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import EnigmaMain from "./features/enigma/EnigmaMain.tsx";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <EnigmaMain />
    </Provider>
  </StrictMode>,
);
