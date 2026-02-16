import { createFileRoute } from "@tanstack/react-router";
import EnigmaPlugboard from "../../../features/enigma/components/setup/enigmaPlugboard.tsx";

export const Route = createFileRoute("/enigma/setup/plugboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaPlugboard />;
}
