import { createFileRoute } from "@tanstack/react-router";
import EnigmaRotors from "../../../features/enigma/components/setup/enigmaRotors.tsx";

export const Route = createFileRoute("/enigma/setup/rotors")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaRotors />;
}
