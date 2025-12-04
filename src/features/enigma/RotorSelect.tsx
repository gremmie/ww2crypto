import Select, { type SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectNumberOfRotors,
  selectRotorTypeChoicesForRotor,
  selectRotorTypeForRotor,
  type SetRotorPayload,
  rotorTypeChanged,
} from "./enigmaSlice.ts";
import { FormHelperText } from "@mui/material";

interface RotorSelectProps {
  rotorNumber: number;
}

export default function RotorSelect(props: RotorSelectProps) {
  const dispatch = useAppDispatch();
  const numberOfRotors = useAppSelector(selectNumberOfRotors);
  const rotorNumber = props.rotorNumber;

  const rotorType = useAppSelector((state) =>
    selectRotorTypeForRotor(state, rotorNumber),
  );
  const rotorTypeChoices = useAppSelector((state) =>
    selectRotorTypeChoicesForRotor(state, rotorNumber),
  );

  const handleChange = (event: SelectChangeEvent) => {
    const payload: SetRotorPayload = {
      rotorType: event.target.value,
      position: rotorNumber,
    };
    dispatch(rotorTypeChanged(payload));
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
        value={rotorType ?? ""}
        label={label}
        onChange={handleChange}
      >
        {rotorTypeChoices.map((r) => {
          return (
            <MenuItem key={r} value={r}>
              {r}
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
