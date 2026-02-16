import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { RouterButton } from "../../../../routerLinkComponents/routerButton.tsx";
import {
  currentTabChanged,
  selectActiveSetupStep,
  selectIsSetupComplete,
  setupStepAdvanced,
  setupStepNames,
  setupStepReversed,
} from "../../enigmaSlice.ts";
import LoadConfigDialog from "./loadConfigDialog.tsx";
import SaveConfigDialog from "./saveConfigDialog.tsx";
import SetupCompleteAlert from "./setupCompleteAlert.tsx";
import SetupName from "./setupName.tsx";
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
  const location = useLocation();

  const nextPath = () => {
    if (canJumpToOperate) {
      return "/enigma/operate";
    }
    return toNextByLocation.get(location.pathname);
  };

  const backPath = () => {
    return toBackByLocation.get(location.pathname);
  };

  return (
    <TabPanel value="setup">
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {isSetupComplete && (
            <Box display="flex" justifyContent="center">
              <SetupCompleteAlert />
            </Box>
          )}
          <Box display="flex" justifyContent="center">
            <SetupName />
          </Box>
          <SetupStepper />
          <Box
            sx={{
              height: {
                xs: "70vh",
                sm: "auto",
              },
              overflowY: "auto",
            }}
          >
            <Box
              width="100%"
              sx={{ pt: 2 }}
              display="flex"
              justifyContent="center"
            >
              <Box width="80%" display="flex" justifyContent="center">
                <Outlet />
              </Box>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{ pt: 4 }}
              justifyContent="space-evenly"
            >
              <LoadConfigDialog />
              <SaveConfigDialog />
            </Stack>
            <Box display="flex" justifyContent="space-around" sx={{ pt: 2 }}>
              <RouterButton
                variant="text"
                startIcon={<ChevronLeftIcon />}
                disabled={activeStep === 0}
                onClick={handleBack}
                to={backPath() as never}
              >
                Back
              </RouterButton>
              <RouterButton
                variant={canJumpToOperate ? "contained" : "text"}
                endIcon={<ChevronRightIcon />}
                disabled={
                  activeStep === setupStepNames.length - 1 && !isSetupComplete
                }
                onClick={handleNext}
                to={nextPath() as never}
              >
                {canJumpToOperate ? "Operate" : "Next"}
              </RouterButton>
            </Box>
          </Box>
        </Stack>
      </Box>
    </TabPanel>
  );
}

const toNextByLocation = new Map<string, string>([
  ["/enigma/setup/model", "/enigma/setup/rotors"],
  ["/enigma/setup/rotors", "/enigma/setup/rings"],
  ["/enigma/setup/rings", "/enigma/setup/plugboard"],
]);

const toBackByLocation = new Map<string, string>([
  ["/enigma/setup/rotors", "/enigma/setup/model"],
  ["/enigma/setup/rings", "/enigma/setup/rotors"],
  ["/enigma/setup/plugboard", "/enigma/setup/rings"],
]);
