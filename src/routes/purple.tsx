import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "../features/main/comingSoon.tsx";

export const Route = createFileRoute("/purple")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoon pageTitle="PURPLE" />;
}
