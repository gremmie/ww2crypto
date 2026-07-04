import { createFileRoute } from "@tanstack/react-router";
import { SwitchesSetup } from "../../../features/purple/components/setup/switchesSetup.tsx";

export const Route = createFileRoute("/purple/setup/switches")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SwitchesSetup />;
}
