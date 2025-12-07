import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";

import type { NotationType } from "./enigmaSlice.ts";

interface NotationSelectorProps {
  currentNotation: NotationType;
  onChange: (choice: NotationType) => void;
}

export default function NotationSelector(props: NotationSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value as NotationType);
  };

  return (
    <FormControl>
      <FormLabel id="enigma-notation-select-label">Notation</FormLabel>
      <RadioGroup
        row
        aria-labelledby="enigma-notation-select-label"
        name="notation-selector-group"
        value={props.currentNotation}
        onChange={handleChange}
      >
        <FormControlLabel value="number" control={<Radio />} label="Numbers" />
        <FormControlLabel value="letter" control={<Radio />} label="Letters" />
      </RadioGroup>
    </FormControl>
  );
}
