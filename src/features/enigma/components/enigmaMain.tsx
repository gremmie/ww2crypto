import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet } from "@tanstack/react-router";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { RouterTab } from "../../../routerLinkComponents/routerTab.tsx";
import {
  currentTabChanged,
  selectCurrentTab,
  type TabType,
} from "../enigmaSlice.ts";

export default function EnigmaMain() {
  const dispatch = useAppDispatch();
  const currentTab = useAppSelector(selectCurrentTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: TabType) => {
    dispatch(currentTabChanged(newValue));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, ml: 2 }}>
        Enigma
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Enigma Tabs">
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
