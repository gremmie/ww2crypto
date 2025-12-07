import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import * as React from "react";
import EnigmaSetup from "./EnigmaSetup.tsx";

export default function EnigmaMain() {
  type TabType = "setup" | "operate";
  const [value, setValue] = React.useState<TabType>("setup");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue as TabType);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Enigma Online
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Enigma Tabs">
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
          <TabPanel value="setup">
            <EnigmaSetup />
          </TabPanel>
          <TabPanel value="operate">Operate stuff goes here.</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
