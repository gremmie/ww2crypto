import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "../features/main/comingSoon.tsx";

export const Route = createFileRoute("/m209")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoon pageTitle="M-209" />;
}
