import Stepper from "@mui/material/Stepper";
import { useLocation } from "@tanstack/react-router";
import type { TRoutes } from "../../../routeTypes.ts";

import type { SetupStepData } from "../models/setupStepData.ts";
import { SetupStepperStep } from "./setupStepperStep.tsx";

interface SetupStepperProps {
  stepData: readonly SetupStepData[];
}

export const SetupStepper = ({ stepData }: SetupStepperProps) => {
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
            isComplete={false}
            routePath={step.path}
          />
        );
      })}
    </Stepper>
  );
};
