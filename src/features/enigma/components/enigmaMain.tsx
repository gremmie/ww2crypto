import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  currentTabChanged,
  selectCurrentTab,
  type TabType,
} from "../enigmaSlice.ts";
import { EnigmaOperateTab } from "./setup/enigmaOperateTab.tsx";
import EnigmaSetupTab from "./setup/enigmaSetupTab.tsx";

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
              <Tab
                label="About"
                value="about"
                icon={<InfoOutlineIcon />}
                iconPosition="start"
              />
              <Tab
                label="Setup"
                value="setup"
                icon={<SettingsIcon />}
                iconPosition="start"
              />
              <Tab
                label="Operate"
                value="operate"
                icon={<KeyboardIcon />}
                iconPosition="start"
              />
            </TabList>
          </Box>
          <TabPanel value="about">
            <div>Coming Soon</div>
          </TabPanel>
          <TabPanel value="setup">
            <EnigmaSetupTab />
          </TabPanel>
          <TabPanel value="operate">
            <EnigmaOperateTab />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
