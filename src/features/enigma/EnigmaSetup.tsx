import * as React from "react";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import EnigmaModel from "./EnigmaModel.tsx";
import EnigmaRotors from "./EnigmaRotors.tsx";
import Stack from "@mui/material/Stack";
import { SetupStepper } from "./SetupStepper.tsx";

const steps = ["Model", "Reflector & Rotors", "Ring Settings", "Plugboard"];

export default function EnigmaSetup() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <SetupStepper activeStep={activeStep} steps={steps} />
        <Box
          width="100%"
          sx={{ pt: 4, pb: 2 }}
          display="flex"
          justifyContent="center"
        >
          <Box width="80%" display="flex" justifyContent="center">
            {renderStep(activeStep)}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" sx={{ pt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ChevronLeftIcon />}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            endIcon={<ChevronRightIcon />}
            disabled={activeStep === steps.length - 1}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function renderStep(step: number) {
  switch (step) {
    case 0: {
      return <EnigmaModel />;
    }
    case 1: {
      return <EnigmaRotors />;
    }
    default: {
      return steps[step];
    }
  }
}
