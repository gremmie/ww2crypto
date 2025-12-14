import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { modelChanged, selectNumberOfRotors } from "./enigmaSlice.ts";

export default function EnigmaModel() {
  const dispatch = useAppDispatch();
  const numberOfRotors = useAppSelector(selectNumberOfRotors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(event.target.value);
    dispatch(modelChanged(n));
  };

  return (
    <Paper elevation={2} sx={{ px: 4, py: 2 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6">Select Model</Typography>
        <FormControl>
          <RadioGroup
            name="enigma-model-radio-group"
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
      </Stack>
    </Paper>
  );
}
