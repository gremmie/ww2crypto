import Stepper from "@mui/material/Stepper";
import { useLocation } from "@tanstack/react-router";

import { useAppSelector } from "../../../../app/hooks.ts";
import type { TRoutes } from "../../../../routeTypes.ts";
import { SetupStepperStep } from "../../../common/components/setupStepperStep.tsx";
import { selectStepCompletionStatus } from "../../enigmaSlice.ts";

export const SetupStepper = () => {
  const status = useAppSelector(selectStepCompletionStatus);
  const location = useLocation();
  const currentPath = location.pathname as TRoutes;
  const activeStep = stepData.findIndex((value) => value.path === currentPath);

  return (
    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
      {stepData.map((step, index) => {
        return (
          <SetupStepperStep
            key={index}
            label={step.label}
            isComplete={status[index]}
            routePath={step.path}
          />
        );
      })}
    </Stepper>
  );
};

const stepData = [
  { label: "Model", path: "/enigma/setup/model" },
  { label: "Reflector & Rotors", path: "/enigma/setup/rotors" },
  { label: "Ring Settings", path: "/enigma/setup/rings" },
  { label: "Plugboard", path: "/enigma/setup/plugboard" },
] as const;
