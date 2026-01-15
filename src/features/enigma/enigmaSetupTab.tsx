import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";

import EnigmaModel from "./enigmaModel.tsx";
import EnigmaPlugboard from "./enigmaPlugboard.tsx";
import EnigmaRingSettings from "./enigmaRingSettings.tsx";
import EnigmaRotors from "./enigmaRotors.tsx";
import {
  currentTabChanged,
  selectActiveSetupStep,
  selectIsSetupComplete,
  setupStepAdvanced,
  setupStepNames,
  setupStepReversed,
} from "./enigmaSlice.ts";
import LoadConfigDialog from "./loadConfigDialog.tsx";
import SaveConfigDialog from "./saveConfigDialog.tsx";
import SetupCompleteAlert from "./setupCompleteAlert.tsx";
import { SetupStepper } from "./setupStepper.tsx";

export default function EnigmaSetupTab() {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(selectActiveSetupStep);
  const isSetupComplete = useAppSelector(selectIsSetupComplete);
  const canJumpToOperate = isSetupComplete && activeStep == 3;

  const handleNext = () => {
    if (canJumpToOperate) {
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
            <SetupCompleteAlert />
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
          <LoadConfigDialog />
          <SaveConfigDialog disabled={!isSetupComplete} />
          <Button
            variant={canJumpToOperate ? "contained" : "text"}
            endIcon={<ChevronRightIcon />}
            disabled={
              activeStep === setupStepNames.length - 1 && !isSetupComplete
            }
            onClick={handleNext}
          >
            {canJumpToOperate ? "Operate" : "Next"}
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
