import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  plugboardCableCountChanged,
  selectPlugboardCableCount,
} from "./enigmaSlice.ts";

const choices = Array.from({ length: 14 }, (_, i) => i);

export default function PlugboardCableCountSelect() {
  const dispatch = useAppDispatch();
  const cableCount = useAppSelector(selectPlugboardCableCount);

  const handleChange = (event: SelectChangeEvent<number>) => {
    dispatch(plugboardCableCountChanged(event.target.value));
  };

  const labelId = "enigma-cable-count-select-label";
  return (
    <FormControl required size="small" sx={{ minWidth: 110 }}>
      <InputLabel id={labelId}>Cable Count</InputLabel>
      <Select
        id="enigma-cable-count-select"
        labelId={labelId}
        value={cableCount}
        label="Cable Count"
        onChange={handleChange}
      >
        {choices.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
