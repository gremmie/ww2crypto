import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/purple/setup/plugboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/purple/setup/plugboard"!</div>;
}
