import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet, useLocation } from "@tanstack/react-router";
import { RouterButton } from "../../../routerLinkComponents/routerButton.tsx";
import type { TRoutes } from "../../../routeTypes.ts";
import LoadConfigDialog from "../../enigma/components/setup/loadConfigDialog.tsx";
import SaveConfigDialog from "../../enigma/components/setup/saveConfigDialog.tsx";
import { SetupStepper as EnigmaSetupStepper } from "../../enigma/components/setup/setupStepper.tsx";
import { SetupStepper as M209SetupStepper } from "../../m209/components/setup/setupStepper.tsx";
import type { MachineType } from "../config/machineType.ts";
import SetupCompleteAlert from "./setupCompleteAlert.tsx";
import SetupName from "./setupName.tsx";

interface SimSetupTabProps {
  machineType: MachineType;
  setupPaths: TRoutes[];
  operatePath: TRoutes;
  isSetupComplete: boolean;
}

export default function SimSetupTab(props: SimSetupTabProps) {
  const location = useLocation();
  const currentPath = location.pathname as TRoutes;
  const isFirstStep = currentPath === props.setupPaths[0];
  const isLastStep = currentPath === props.setupPaths[-1];
  const isSetupComplete = props.isSetupComplete;
  const canJumpToOperate = isSetupComplete && isLastStep;

  const nextPath = (): TRoutes => {
    if (canJumpToOperate) {
      return props.operatePath;
    }
    const n = props.setupPaths.indexOf(currentPath);
    return n === -1 || n === props.setupPaths.length - 1
      ? currentPath
      : props.setupPaths[n + 1];
  };

  const backPath = (): TRoutes => {
    const n = props.setupPaths.indexOf(currentPath);
    return n === -1 || n === 0 ? currentPath : props.setupPaths[n - 1];
  };

  return (
    <TabPanel value="setup">
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {isSetupComplete && (
            <Box display="flex" justifyContent="center">
              <SetupCompleteAlert
                machineType={props.machineType}
                operatePath={props.operatePath}
              />
            </Box>
          )}
          <Box display="flex" justifyContent="center">
            <SetupName />
          </Box>
          {props.machineType === "enigma" && <EnigmaSetupStepper />}
          {props.machineType === "m209" && <M209SetupStepper />}
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
                disabled={isFirstStep}
                to={backPath()}
              >
                Back
              </RouterButton>
              <RouterButton
                variant={canJumpToOperate ? "contained" : "text"}
                endIcon={<ChevronRightIcon />}
                disabled={isLastStep && !isSetupComplete}
                to={nextPath()}
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
