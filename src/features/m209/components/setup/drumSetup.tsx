import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drum from "./drum.tsx";

export default function DrumSetup() {
  return (
    <Box display="flex" justifyContent="center">
      <Stack direction="column" spacing={3} width={350}>
        <Drum />
      </Stack>
    </Box>
  );
}
