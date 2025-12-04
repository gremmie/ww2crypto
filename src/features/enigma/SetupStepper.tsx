import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useAppSelector } from "../../app/hooks.ts";
import { selectStepCompletionStatus } from "./enigmaSlice.ts";

interface SetupStepperProps {
  activeStep: number;
  steps: string[];
}

export const SetupStepper = (props: SetupStepperProps) => {
  const status = useAppSelector(selectStepCompletionStatus);
  return (
    <Stepper nonLinear activeStep={props.activeStep} alternativeLabel>
      {props.steps.map((label, index) => {
        return (
          <Step key={index} completed={status[index]}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
