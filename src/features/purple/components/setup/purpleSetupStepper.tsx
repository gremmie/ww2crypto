import { SetupStepper } from "../../../common/components/setupStepper.tsx";

export const PurpleSetupStepper = () => {
  return <SetupStepper stepData={stepData} />;
};

const stepData = [
  { label: "Plugboard", path: "/purple/setup/plugboard" },
  { label: "Switches", path: "/purple/setup/switches" },
] as const;
