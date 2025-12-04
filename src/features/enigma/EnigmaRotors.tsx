import type { ReactElement } from "react";
import Stack from "@mui/material/Stack";

import { useAppSelector } from "../../app/hooks.ts";
import { selectRotorTypeChoices } from "./enigmaSlice.ts";
import ReflectorSelect from "./ReflectorSelect.tsx";
import RotorSelect from "./RotorSelect.tsx";
import Typography from "@mui/material/Typography";

export default function EnigmaRotors() {
  const rotorTypeChoices = useAppSelector(selectRotorTypeChoices);

  const numberOfRotors = rotorTypeChoices.length;

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
    </Stack>
  );
}
