import { createRootRoute } from "@tanstack/react-router";
import { MainApp } from "../features/main/mainApp.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <MainApp />;
}
