import { createFileRoute } from "@tanstack/react-router";
import SimSetupTab from "../../../features/common/components/simSetupTab.tsx";
import type { TRoutes } from "../../../routeTypes.ts";

export const Route = createFileRoute("/purple/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimSetupTab
      machineType="purple"
      setupPaths={setupPaths}
      operatePath="/purple/operate"
      isSetupComplete={false}
    />
  );
}

const setupPaths: TRoutes[] = [
  "/purple/setup/plugboard",
  "/purple/setup/switches",
] as const;
