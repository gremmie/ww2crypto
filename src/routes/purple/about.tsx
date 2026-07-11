import { createFileRoute } from "@tanstack/react-router";
import { PurpleAbout } from "../../features/purple/components/about.tsx";

export const Route = createFileRoute("/purple/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PurpleAbout />;
}
