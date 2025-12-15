import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./app/store";
import EnigmaMain from "./features/enigma/EnigmaMain.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <EnigmaMain />
    </Provider>
  </StrictMode>,
);
