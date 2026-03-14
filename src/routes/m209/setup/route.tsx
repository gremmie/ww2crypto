import { createFileRoute } from "@tanstack/react-router";
import SimSetupTab from "../../../features/common/components/simSetupTab.tsx";
import type { TRoutes } from "../../../routeTypes.ts";

export const Route = createFileRoute("/m209/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimSetupTab
      machineType="m209"
      setupPaths={setupPaths}
      operatePath="/m209/operate"
      isSetupComplete={false}
    />
  );
}

const setupPaths: TRoutes[] = [
  "/m209/setup/drum",
  "/m209/setup/wheels",
] as const;
