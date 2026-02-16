import { createFileRoute } from "@tanstack/react-router";
import EnigmaAbout from "../../features/enigma/components/about.tsx";

export const Route = createFileRoute("/enigma/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EnigmaAbout />;
}
