import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { type ReactElement } from "react";

import { useAppSelector } from "../../../../app/hooks.ts";
import { selectNumberOfRotors } from "../../enigmaSlice.ts";
import ReflectorSelect from "./reflectorSelect.tsx";
import RotorSelect from "./rotorSelect.tsx";

export default function EnigmaRotors() {
  const numberOfRotors = useAppSelector(selectNumberOfRotors);

  const selects: ReactElement[] = [<ReflectorSelect key="reflector" />];
  for (let i = 0; i < numberOfRotors; ++i) {
    selects.push(<RotorSelect key={i} rotorNumber={i} />);
  }

  const helpContent = (
    <>
      <Typography component="p">
        There is only one instance of each type of rotor. If you pick a rotor a
        second time it will be removed from the previously installed position.
      </Typography>
      {numberOfRotors == 3 && (
        <Typography component="p" sx={{ mt: 2 }}>
          Note that rotors VI - VIII were only available on the Naval Enigmas.
        </Typography>
      )}
    </>
  );

  return (
    <Stack spacing={4} alignItems="center">
      <Typography variant="h6" display="flex" alignItems="center" gap={0.5}>
        Select reflector, rotors, and rotor order
        <Tooltip title={helpContent} arrow enterTouchDelay={350}>
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        useFlexGap
        spacing={2}
        sx={{ mt: 4 }}
        justifyContent="center"
      >
        {selects}
      </Stack>
    </Stack>
  );
}
