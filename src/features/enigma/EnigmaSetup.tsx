import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import EnigmaModel from "./EnigmaModel.tsx";
import EnigmaPlugboard from "./EnigmaPlugboard.tsx";
import EnigmaRingSettings from "./EnigmaRingSettings.tsx";
import EnigmaRotors from "./EnigmaRotors.tsx";
import { SetupStepper } from "./SetupStepper.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectActiveSetupStep,
  setupStepAdvanced,
  setupStepNames,
  setupStepReversed,
} from "./enigmaSlice.ts";

export default function EnigmaSetup() {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(selectActiveSetupStep);

  const handleNext = () => {
    dispatch(setupStepAdvanced());
  };

  const handleBack = () => {
    dispatch(setupStepReversed());
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <SetupStepper steps={setupStepNames} />
        <Box width="100%" sx={{ pt: 4 }} display="flex" justifyContent="center">
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
            disabled={activeStep === setupStepNames.length - 1}
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
    case 2: {
      return <EnigmaRingSettings />;
    }
    case 3: {
      return <EnigmaPlugboard />;
    }
    default: {
      return setupStepNames[step];
    }
  }
}
