import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";

import EnigmaModel from "./EnigmaModel.tsx";
import EnigmaPlugboard from "./EnigmaPlugboard.tsx";
import EnigmaRingSettings from "./EnigmaRingSettings.tsx";
import EnigmaRotors from "./EnigmaRotors.tsx";
import {
  currentTabChanged,
  selectActiveSetupStep,
  selectIsSetupComplete,
  setupStepAdvanced,
  setupStepNames,
  setupStepReversed,
} from "./enigmaSlice.ts";
import { SetupStepper } from "./SetupStepper.tsx";

export default function EnigmaSetup() {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(selectActiveSetupStep);
  const isSetupComplete = useAppSelector(selectIsSetupComplete);

  const handleNext = () => {
    if (isSetupComplete) {
      dispatch(currentTabChanged("operate"));
    } else {
      dispatch(setupStepAdvanced());
    }
  };

  const handleBack = () => {
    dispatch(setupStepReversed());
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {isSetupComplete && (
          <Box display="flex" justifyContent="center">
            <Alert severity="success" sx={{ width: "80%" }}>
              <Typography variant="body1" component="span">
                Setup complete. You may now{" "}
                <Link
                  component="button"
                  variant="inherit"
                  sx={{ verticalAlign: "baseline" }}
                  onClick={() => dispatch(currentTabChanged("operate"))}
                >
                  operate
                </Link>{" "}
                your Enigma machine!
              </Typography>
            </Alert>
          </Box>
        )}
        <SetupStepper steps={setupStepNames} />
        <Box width="100%" sx={{ pt: 4 }} display="flex" justifyContent="center">
          <Box width="80%" display="flex" justifyContent="center">
            {renderStep(activeStep)}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" sx={{ pt: 2 }}>
          <Button
            variant="text"
            startIcon={<ChevronLeftIcon />}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant={isSetupComplete ? "contained" : "text"}
            endIcon={<ChevronRightIcon />}
            disabled={
              activeStep === setupStepNames.length - 1 && !isSetupComplete
            }
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
