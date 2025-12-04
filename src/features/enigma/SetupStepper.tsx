import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectActiveSetupStep,
  selectStepCompletionStatus,
  setupStepChanged,
} from "./enigmaSlice.ts";

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
            <StepButton color="inherit" onClick={() => handleChangeStep(index)}>
              {label}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};
