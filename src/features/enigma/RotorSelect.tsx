import Select, { type SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectNumberOfRotors,
  selectRotorTypeChoices,
  selectRotorTypes,
  type SetRotorPayload,
  setRotorType,
} from "./enigmaSlice.ts";
import { FormHelperText } from "@mui/material";

interface RotorSelectProps {
  rotorNumber: number;
}

export default function RotorSelect(props: RotorSelectProps) {
  const dispatch = useAppDispatch();
  const rotorTypes = useAppSelector(selectRotorTypes);
  const rotorTypeChoices = useAppSelector(selectRotorTypeChoices);
  const numberOfRotors = useAppSelector(selectNumberOfRotors);

  const rotorNumber = props.rotorNumber;

  const handleChange = (event: SelectChangeEvent) => {
    const payload: SetRotorPayload = {
      rotorType: event.target.value,
      position: rotorNumber,
    };
    dispatch(setRotorType(payload));
  };

  const labelId = `enigma-rotor-${rotorNumber}-select-label`;
  const label = `Rotor ${rotorNumber + 1}`;
  const choices = rotorTypeChoices[rotorNumber];
  const showLeftHelperText = rotorNumber === 0;
  const showRightHelperText = numberOfRotors - 1 === rotorNumber;

  return (
    <FormControl required sx={{ minWidth: 110 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={rotorTypes[rotorNumber] ?? ""}
        label={label}
        onChange={handleChange}
      >
        {choices.map((r) => {
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
