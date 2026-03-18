import { createFileRoute } from "@tanstack/react-router";
import DrumSetup from "../../../features/m209/components/setup/drumSetup.tsx";

export const Route = createFileRoute("/m209/setup/drum")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DrumSetup />;
}
