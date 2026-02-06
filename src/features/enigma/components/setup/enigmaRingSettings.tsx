import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  type NotationType,
  ringSettingsNotationChanged,
  selectNumberOfRotors,
  selectRingSettingsNotation,
} from "../../enigmaSlice.ts";

import NotationSelector from "./notationSelector.tsx";
import RingSelect from "./ringSelect.tsx";

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
    <Stack spacing={4} alignItems="center">
      <Typography variant="h6">Establish ring settings</Typography>
      <NotationSelector
        currentNotation={notation}
        onChange={handleNotationChange}
      />
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} useFlexGap>
        {selects}
      </Stack>
    </Stack>
  );
}
