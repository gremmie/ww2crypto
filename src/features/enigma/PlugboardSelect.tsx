import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import type { NotationType } from "./enigmaSlice.ts";

interface PlugboardSelectProps {
  label: string;
  notation: NotationType;
  disabled: boolean;
  value: string | null;
  choices: string[];
  onChange: (newValue: string) => void;
}

export default function PlugboardSelect(props: PlugboardSelectProps) {
  const handleChange = (e: SelectChangeEvent) => {
    props.onChange(e.target.value);
  };

  const labelId = `enigma-plugboard-${props.label.replace(" ", "-")}-select-label`;

  return (
    <FormControl required sx={{ minWidth: 110 }}>
      <InputLabel id={labelId}>{props.label}</InputLabel>
      <Select
        label={props.label}
        labelId={labelId}
        value={props.value ?? ""}
        onChange={handleChange}
        disabled={props.disabled}
      >
        {props.choices.map((n) => {
          return (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
