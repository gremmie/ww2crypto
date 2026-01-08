import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  ringSettingChanged,
  type RingSettingChangedPayload,
  selectNumberOfRotors,
  selectRingSettingForRotor,
  selectRingSettingsNotation,
} from "./enigmaSlice.ts";

interface RingSelectProps {
  rotorNumber: number;
}

export default function RingSelect(props: RingSelectProps) {
  const dispatch = useAppDispatch();
  const numberOfRotors = useAppSelector(selectNumberOfRotors);
  const rotorNumber = props.rotorNumber;

  const ringSetting = useAppSelector((state) =>
    selectRingSettingForRotor(state, rotorNumber),
  );
  const notation = useAppSelector(selectRingSettingsNotation);
  const choices = Array.from({ length: 26 }, (_, i) => i);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const payload: RingSettingChangedPayload = {
      ringSetting: event.target.value as number,
      position: rotorNumber,
    };
    dispatch(ringSettingChanged(payload));
  };

  const labelId = `enigma-rotor-${rotorNumber}-select-label`;
  const label = `Rotor ${rotorNumber + 1}`;
  const showLeftHelperText = rotorNumber === 0;
  const showRightHelperText = numberOfRotors - 1 === rotorNumber;

  return (
    <FormControl required sx={{ minWidth: 110 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={ringSetting ?? ""}
        label={label}
        onChange={handleChange}
      >
        {choices.map((n) => {
          const aCode = "A".charCodeAt(0);
          return (
            <MenuItem key={n} value={n}>
              {notation === "number" ? n + 1 : String.fromCharCode(aCode + n)}
            </MenuItem>
          );
        })}
      </Select>
      {showLeftHelperText ? (
        <FormHelperText>Leftmost rotor</FormHelperText>
      ) : null}
      {showRightHelperText ? (
        <FormHelperText>Rightmost rotor</FormHelperText>
      ) : null}
    </FormControl>
  );
}
