import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  type ReflectorType,
  selectReflector,
  selectReflectorChoices,
  setReflector,
} from "./enigmaSlice.ts";

export default function ReflectorSelect() {
  const dispatch = useAppDispatch();
  const reflectorChoice = useAppSelector(selectReflector);
  const reflectors = useAppSelector(selectReflectorChoices);

  const handleChange = (event: SelectChangeEvent<ReflectorType>) => {
    dispatch(setReflector(event.target.value as ReflectorType));
  };

  return (
    <FormControl required sx={{ minWidth: 120 }}>
      <InputLabel id="enigma-reflector-select-label">Reflector</InputLabel>
      <Select
        labelId="enigma-reflector-select-label"
        value={reflectorChoice == null ? "" : reflectorChoice}
        label="Reflector"
        onChange={handleChange}
      >
        {reflectors.map((r) => {
          return (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
