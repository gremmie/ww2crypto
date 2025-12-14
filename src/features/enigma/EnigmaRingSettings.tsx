import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  type NotationType,
  ringSettingsNotationChanged,
  selectNumberOfRotors,
  selectRingSettingsNotation,
} from "./enigmaSlice.ts";

import NotationSelector from "./NotationSelector.tsx";
import RingSelect from "./RingSelect.tsx";

export default function EnigmaRingSettings() {
  const dispatch = useAppDispatch();
  const numberOfRotors = useAppSelector(selectNumberOfRotors);
  const notation = useAppSelector(selectRingSettingsNotation);

  const handleNotationChange = (newValue: NotationType) => {
    dispatch(ringSettingsNotationChanged(newValue));
  };

  const selects = Array.from({ length: numberOfRotors }, (_, i) => (
    <RingSelect key={i} rotorNumber={i} />
  ));

  return (
    <Paper elevation={2} sx={{ px: 4, py: 2 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6">Establish ring settings</Typography>
        <NotationSelector
          currentNotation={notation}
          onChange={handleNotationChange}
        />
        <Stack spacing={2} direction="row">
          {selects}
        </Stack>
      </Stack>
    </Paper>
  );
}
