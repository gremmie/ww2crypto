import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";

import { useAppSelector } from "../../app/hooks.ts";
import { selectNumberOfRotors } from "./enigmaSlice.ts";
import ReflectorSelect from "./ReflectorSelect.tsx";
import RotorSelect from "./RotorSelect.tsx";

export default function EnigmaRotors() {
  const numberOfRotors = useAppSelector(selectNumberOfRotors);

  const selects: ReactElement[] = [<ReflectorSelect key="reflector" />];
  for (let i = 0; i < numberOfRotors; ++i) {
    selects.push(<RotorSelect key={i} rotorNumber={i} />);
  }

  return (
    <Paper elevation={2} sx={{ px: 4, py: 2 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6">
          Select reflector, rotors, and rotor order
        </Typography>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
          justifyContent="center"
        >
          {selects}
        </Stack>
        <Box sx={{ mt: 4, maxWidth: 0.7 }}>
          <Alert severity="info">
            There is only one instance of each type of rotor. If you pick a
            rotor a second time it will be removed from the previously installed
            position.
          </Alert>
          {numberOfRotors == 3 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Note that rotors VI - VIII were only available on the Naval M3
              model.
            </Alert>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
