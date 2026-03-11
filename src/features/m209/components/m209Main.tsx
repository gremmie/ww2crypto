import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation } from "@tanstack/react-router";
import { RouterTab } from "../../../routerLinkComponents/routerTab.tsx";
import type { TRoutes } from "../../../routeTypes.ts";

export default function M209Main() {
  const location = useLocation();
  const currentPath = location.pathname as TRoutes;
  if (!currentPath.startsWith("/m209")) return null;
  const currentTab = currentPath.split("/")[2];

  return (
    <>
      <Typography
        variant="h4"
        component="h3"
        gutterBottom
        sx={{
          fontFamily: '"Special Elite", cursive',
          fontWeight: 400,
          mt: 2,
          ml: 2,
        }}
      >
        M-209
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="M-209 Tabs">
              <RouterTab
                label="About"
                value="about"
                icon={<InfoOutlineIcon />}
                iconPosition="start"
                to="/m209/about"
              />
              <RouterTab
                label="Setup"
                value="setup"
                icon={<SettingsIcon />}
                iconPosition="start"
                to="/m209/setup/drum"
              />
              <RouterTab
                label="Operate"
                value="operate"
                icon={<KeyboardIcon />}
                iconPosition="start"
                to="/m209/operate"
              />
            </TabList>
          </Box>
          <Outlet />
        </TabContext>
      </Box>
    </>
  );
}
