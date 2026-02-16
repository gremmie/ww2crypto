import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { RouterStepButton } from "../../../../routerLinkComponents/routerStepButton.tsx";
import type { TRoutes } from "../../../../routeTypes.ts";
import {
  selectActiveSetupStep,
  selectStepCompletionStatus,
  setupStepChanged,
} from "../../enigmaSlice.ts";

export const SetupStepper = () => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(selectActiveSetupStep);
  const status = useAppSelector(selectStepCompletionStatus);

  const handleChangeStep = (newStep: number) => {
    dispatch(setupStepChanged(newStep));
  };

  return (
    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
      {stepData.map((step, index) => {
        return (
          <Step key={index} completed={status[index]}>
            <RouterStepButton
              color="inherit"
              onClick={() => handleChangeStep(index)}
              to={step.path as never}
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
