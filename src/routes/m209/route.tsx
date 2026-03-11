import { createFileRoute } from "@tanstack/react-router";
import { SimMain } from "../../features/common/components/simMain.tsx";

export const Route = createFileRoute("/m209")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimMain simName="M-209" basePath="/m209" setupPath="/m209/setup/drum" />
  );
}
