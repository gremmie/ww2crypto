import { createFileRoute } from "@tanstack/react-router";
import EnigmaMain from "../../features/enigma/components/enigmaMain.tsx";

export const Route = createFileRoute("/enigma")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaMain />;
}
