import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import { useLocation } from "@tanstack/react-router";

import { useAppSelector } from "../../../../app/hooks.ts";
import { RouterStepButton } from "../../../../routerLinkComponents/routerStepButton.tsx";
import type { TRoutes } from "../../../../routeTypes.ts";
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
          <Step key={index} completed={status[index]}>
            <RouterStepButton
              color="inherit"
              to={step.path}
              sx={{
                // Active completed steps are shown in primary so we don't lose our place.
                "& .MuiStepLabel-iconContainer.Mui-active.Mui-completed": {
                  "& .MuiStepIcon-root": {
                    color: "primary.main",
                  },
                },
                // Completed, non-active steps are shown in success color.
                "& .MuiStepLabel-iconContainer.Mui-completed": {
                  "& .MuiStepIcon-root": {
                    color: "success.light",
                  },
                },
              }}
            >
              {step.label}
            </RouterStepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

interface StepData {
  label: string;
  path: TRoutes;
}

const stepData: StepData[] = [
  { label: "Model", path: "/enigma/setup/model" },
  { label: "Reflector & Rotors", path: "/enigma/setup/rotors" },
  { label: "Ring Settings", path: "/enigma/setup/rings" },
  { label: "Plugboard", path: "/enigma/setup/plugboard" },
];
