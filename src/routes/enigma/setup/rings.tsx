import { createFileRoute } from "@tanstack/react-router";
import EnigmaRingSettings from "../../../features/enigma/components/setup/enigmaRingSettings.tsx";

export const Route = createFileRoute("/enigma/setup/rings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaRingSettings />;
}
