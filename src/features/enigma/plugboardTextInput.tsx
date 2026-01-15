import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  type NotationType,
  plugboardBulkSet,
  selectPlugboardCableCount,
  selectPlugboardNotation,
} from "./enigmaSlice.ts";
import {
  aCode,
  isValidNumericPlugboardString,
  isValidPlugboardString,
  toAlphaPlugboardString,
  toNumericPlugboardString,
} from "./utils.ts";

export default function PlugboardTextInput() {
  const dispatch = useAppDispatch();
  const notation = useAppSelector(selectPlugboardNotation);
  const cableCount = useAppSelector(selectPlugboardCableCount);
  const [value, setValue] = useState("");

  const isValid =
    notation === "letter"
      ? isValidPlugboardString(value.trim(), cableCount)
      : isValidNumericPlugboardString(value.trim(), cableCount);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSetClick = () => {
    let settings = value.trim();
    if (notation === "number") {
      settings = toAlphaPlugboardString(value.trim());
    }
    dispatch(plugboardBulkSet(settings));
    setValue("");
  };

  const helpText =
    cableCount === 0 ? "" : generateHelpText(cableCount, notation);

  return (
    <Stack direction="row" alignItems="baseline" spacing={2}>
      <TextField
        id="enigma-plugboard-text-input"
        label="Connection String"
        variant="outlined"
        helperText={helpText}
        value={value}
        onChange={handleChange}
        disabled={cableCount === 0}
      />
      <Button
        variant="contained"
        disabled={!isValid || cableCount === 0}
        onClick={handleSetClick}
      >
        Set
      </Button>
    </Stack>
  );
}

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(aCode + i),
);

function generateHelpText(cableCount: number, notation: NotationType) {
  const result = new Array<string>();
  let n = 0;
  for (let i = 0; i < cableCount; ++i) {
    result.push(alphabet[n++]);
    result.push(alphabet[n++]);
    result.push(" ");
  }
  let settings = result.join("").trim();
  if (notation === "number") {
    settings = toNumericPlugboardString(settings);
  }

  return "e.g. " + settings;
}
