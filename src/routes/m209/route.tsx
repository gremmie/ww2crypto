import { createFileRoute } from "@tanstack/react-router";
import M209Main from "../../features/m209/components/m209Main.tsx";

export const Route = createFileRoute("/m209")({
  component: RouteComponent,
});

function RouteComponent() {
  console.log("Hitting /m209");
  return <M209Main />;
}
