import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/purple/setup/switches")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/purple/setup/switches"!</div>;
}
