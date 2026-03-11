import { createFileRoute } from "@tanstack/react-router";
import M209SetupTab from "../../../features/m209/components/setup/m209SetupTab.tsx";

export const Route = createFileRoute("/m209/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <M209SetupTab />;
}
