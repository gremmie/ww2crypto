import { createFileRoute } from "@tanstack/react-router";
import { Plugboard } from "../../../features/purple/components/setup/plugboard.tsx";

export const Route = createFileRoute("/purple/setup/plugboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Plugboard />;
}
