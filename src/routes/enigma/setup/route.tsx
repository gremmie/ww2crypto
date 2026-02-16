import { createFileRoute } from "@tanstack/react-router";
import EnigmaSetupTab from "../../../features/enigma/components/setup/enigmaSetupTab.tsx";

export const Route = createFileRoute("/enigma/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaSetupTab />;
}
