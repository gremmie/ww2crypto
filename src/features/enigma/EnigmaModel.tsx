import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectNumberOfRotors, modelChanged } from "./enigmaSlice.ts";

export default function EnigmaModel() {
  const dispatch = useAppDispatch();
  const numberOfRotors = useAppSelector(selectNumberOfRotors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(event.target.value);
    dispatch(modelChanged(n));
  };

  return (
    <FormControl>
      <FormLabel id="enigma-model-group">Select Model</FormLabel>
      <RadioGroup
        aria-labelledby="enigma-model-group"
        name="controlled-radio-buttons-group"
        value={numberOfRotors.toString()}
        onChange={handleChange}
      >
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Three Rotor (Army, Air Force, Navy M3)"
        />
        <FormControlLabel
          value="4"
          control={<Radio />}
          label="Four Rotor (Navy M4)"
        />
      </RadioGroup>
    </FormControl>
  );
}
