import { createFileRoute } from "@tanstack/react-router";
import { PlugboardSetup } from "../../../features/purple/components/setup/plugboardSetup.tsx";

export const Route = createFileRoute("/purple/setup/plugboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PlugboardSetup />;
}
