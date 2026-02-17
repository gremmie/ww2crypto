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

export default function EnigmaMain() {
  const location = useLocation();
  const currentPath = location.pathname as TRoutes;
  const currentTab = currentPath.split("/")[2];

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, ml: 2 }}>
        Enigma
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="Enigma Tabs">
              <RouterTab
                label="About"
                value="about"
                icon={<InfoOutlineIcon />}
                iconPosition="start"
                to="/enigma/about"
              />
              <RouterTab
                label="Setup"
                value="setup"
                icon={<SettingsIcon />}
                iconPosition="start"
                to="/enigma/setup/model"
              />
              <RouterTab
                label="Operate"
                value="operate"
                icon={<KeyboardIcon />}
                iconPosition="start"
                to="/enigma/operate"
              />
            </TabList>
          </Box>
          <Outlet />
        </TabContext>
      </Box>
    </>
  );
}
