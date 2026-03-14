import { createFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "../../../app/hooks.ts";
import SimSetupTab from "../../../features/common/components/simSetupTab.tsx";
import { selectIsSetupComplete } from "../../../features/enigma/enigmaSlice.ts";
import type { TRoutes } from "../../../routeTypes.ts";

export const Route = createFileRoute("/enigma/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  const isSetupComplete = useAppSelector(selectIsSetupComplete);
  return (
    <SimSetupTab
      machineType="enigma"
      setupPaths={setupPaths}
      operatePath="/enigma/operate"
      isSetupComplete={isSetupComplete}
    />
  );
}

const setupPaths: TRoutes[] = [
  "/enigma/setup/model",
  "/enigma/setup/rotors",
  "/enigma/setup/rings",
  "/enigma/setup/plugboard",
] as const;
