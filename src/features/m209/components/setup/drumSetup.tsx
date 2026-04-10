import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drum from "./drum.tsx";
import DrumStatus from "./drumStatus.tsx";

export default function DrumSetup() {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={5}
        display="flex"
        alignItems="center"
      >
        <Drum />
        <DrumStatus />
      </Stack>
    </Box>
  );
}
