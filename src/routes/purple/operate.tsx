import { createFileRoute } from "@tanstack/react-router";
import { PurpleOperateTab } from "../../features/purple/components/operate/operateTab.tsx";

export const Route = createFileRoute("/purple/operate")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PurpleOperateTab />;
}
