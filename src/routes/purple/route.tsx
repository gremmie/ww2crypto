import { createFileRoute } from "@tanstack/react-router";
import { SimMain } from "../../features/common/components/simMain.tsx";

export const Route = createFileRoute("/purple")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimMain
      simName="PURPLE"
      basePath="/purple"
      setupPath="/purple/setup/plugboard"
    />
  );
}
