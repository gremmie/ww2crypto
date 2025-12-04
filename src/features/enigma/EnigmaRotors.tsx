import type { ReactElement } from "react";
import Stack from "@mui/material/Stack";

import { useAppSelector } from "../../app/hooks.ts";
import { selectNumberOfRotors } from "./enigmaSlice.ts";
import ReflectorSelect from "./ReflectorSelect.tsx";
import RotorSelect from "./RotorSelect.tsx";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";

export default function EnigmaRotors() {
  const numberOfRotors = useAppSelector(selectNumberOfRotors);

  const selects: ReactElement[] = [<ReflectorSelect key="reflector" />];
  for (let i = 0; i < numberOfRotors; ++i) {
    selects.push(<RotorSelect key={i} rotorNumber={i} />);
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body1">
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
      <Alert variant="outlined" severity="info">
        There is only one instance of each type of rotor. If you pick a rotor
        twice it will be removed from the previously installed position.
      </Alert>
    </Stack>
  );
}
