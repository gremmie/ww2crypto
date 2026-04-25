import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drum from "./drum.tsx";
import DrumSetupControls from "./drumSetupControls.tsx";

export default function DrumSetup() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Drum />
        <DrumSetupControls />
      </Stack>
    </Box>
  );
}
