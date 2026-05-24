import { createFileRoute } from "@tanstack/react-router";
import { M209OperateTab } from "../../features/m209/components/operate/operateTab.tsx";

export const Route = createFileRoute("/m209/operate")({
  component: RouteComponent,
});

function RouteComponent() {
  return <M209OperateTab />;
}
