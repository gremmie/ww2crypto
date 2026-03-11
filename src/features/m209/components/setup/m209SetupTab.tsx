import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet, useLocation } from "@tanstack/react-router";
//import { useAppSelector } from "../../../../app/hooks.ts";
import { RouterButton } from "../../../../routerLinkComponents/routerButton.tsx";
import type { TRoutes } from "../../../../routeTypes.ts";
// import { selectIsSetupComplete } from "../../enigmaSlice.ts";
// import LoadConfigDialog from "./loadConfigDialog.tsx";
// import SaveConfigDialog from "./saveConfigDialog.tsx";
// import SetupCompleteAlert from "./setupCompleteAlert.tsx";
// import SetupName from "./setupName.tsx";
import { SetupStepper } from "./setupStepper.tsx";

export default function M209SetupTab() {
  const location = useLocation();
  const currentPath = location.pathname as TRoutes;
  const isFirstStep = currentPath === "/m209/setup/drum";
  const isLastStep = currentPath === "/m209/setup/wheels";
  const isSetupComplete = false; //useAppSelector(selectIsSetupComplete);
  const canJumpToOperate = isSetupComplete && isLastStep;

  const nextPath = () => {
    if (canJumpToOperate) {
      return "/m209/operate";
    }
    return toNextByLocation.get(location.pathname as TRoutes);
  };

  const backPath = () => {
    return toBackByLocation.get(location.pathname as TRoutes);
  };

  return (
    <TabPanel value="setup">
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {isSetupComplete && (
            <Box display="flex" justifyContent="center">
              {/*<SetupCompleteAlert />*/}
            </Box>
          )}
          <Box display="flex" justifyContent="center">
            {/*<SetupName />*/}
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
              {/*<LoadConfigDialog />*/}
              {/*<SaveConfigDialog />*/}
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

const toNextByLocation = new Map<TRoutes, TRoutes>([
  ["/m209/setup/drum", "/m209/setup/wheels"],
]);

const toBackByLocation = new Map<TRoutes, TRoutes>([
  ["/m209/setup/wheels", "/m209/setup/drum"],
]);
