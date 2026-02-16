import { createFileRoute } from "@tanstack/react-router";
import EnigmaModel from "../../../features/enigma/components/setup/enigmaModel.tsx";

export const Route = createFileRoute("/enigma/setup/model")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaModel />;
}
