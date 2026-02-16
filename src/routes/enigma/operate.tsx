import { createFileRoute } from "@tanstack/react-router";
import { EnigmaOperateTab } from "../../features/enigma/components/setup/enigmaOperateTab.tsx";

export const Route = createFileRoute("/enigma/operate")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaOperateTab />;
}
