import { createFileRoute } from "@tanstack/react-router";
import { SimMain } from "../../features/common/components/simMain.tsx";

export const Route = createFileRoute("/enigma")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimMain
      simName="Enigma"
      basePath="/enigma"
      setupPath="/enigma/setup/model"
    />
  );
}
