import type { TRoutes } from "../../../../routeTypes.ts";
import { SetupStepper } from "../../../common/components/setupStepper.tsx";

export const M209SetupStepper = () => {
  return <SetupStepper stepData={stepData} />;
};

interface SetupStepData {
  label: string;
  path: TRoutes;
}

const stepData: SetupStepData[] = [
  { label: "Drum Lugs", path: "/m209/setup/drum" },
  { label: "Wheel Pins", path: "/m209/setup/wheels" },
] as const;
