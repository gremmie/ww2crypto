import { createFileRoute } from "@tanstack/react-router";
import { M209About } from "../../features/m209/components/about.tsx";

export const Route = createFileRoute("/m209/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <M209About />;
}
