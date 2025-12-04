import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface SetupStepperProps {
  activeStep: number;
  steps: string[];
}

export const SetupStepper = (props: SetupStepperProps) => {
  return (
    <Stepper nonLinear activeStep={props.activeStep} alternativeLabel>
      {props.steps.map((label, index) => {
        return (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
