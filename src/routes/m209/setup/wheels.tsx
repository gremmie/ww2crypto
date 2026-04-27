import { createFileRoute } from "@tanstack/react-router";
import { WheelSetup } from "../../../features/m209/components/setup/wheelSetup.tsx";

export const Route = createFileRoute("/m209/setup/wheels")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WheelSetup />;
}
