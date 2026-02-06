import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectActiveSetupStep,
  selectStepCompletionStatus,
  setupStepChanged,
} from "../../enigmaSlice.ts";

interface SetupStepperProps {
  steps: string[];
}

export const SetupStepper = (props: SetupStepperProps) => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(selectActiveSetupStep);
  const status = useAppSelector(selectStepCompletionStatus);

  const handleChangeStep = (newStep: number) => {
    dispatch(setupStepChanged(newStep));
  };

  return (
    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
      {props.steps.map((label, index) => {
        return (
          <Step key={index} completed={status[index]}>
            <StepButton
              color="inherit"
              onClick={() => handleChangeStep(index)}
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
              {label}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};
