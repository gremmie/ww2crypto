import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { rotorDisplayChanged, selectRotorWindow } from "./enigmaSlice.ts";
import { aCode, modulo } from "./utils.ts";

interface RotorWindowProps {
  index: number;
}

export default function RotorWindow(props: RotorWindowProps) {
  const dispatch = useAppDispatch();
  const validValuePattern = /^[a-zA-Z]$/;
  const index = props.index;
  const displayValue = useAppSelector((s) => selectRotorWindow(s, index)!);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as string;
    if (validValuePattern.test(newValue)) {
      dispatch(
        rotorDisplayChanged({ index: index, value: newValue.toUpperCase() }),
      );
    }
  };

  const stepValue = (direction: 1 | -1) => {
    return String.fromCharCode(
      modulo(displayValue.charCodeAt(0) - aCode + direction, 26) + aCode,
    );
  };

  const handleBack = () => {
    dispatch(rotorDisplayChanged({ index: index, value: stepValue(-1) }));
  };

  const handleForward = () => {
    dispatch(rotorDisplayChanged({ index: index, value: stepValue(1) }));
  };

  return (
    <Stack direction="column" spacing={1}>
      <IconButton aria-label="Back" onClick={handleBack}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <TextField
        id={`rotor-window-${index}`}
        slotProps={{
          htmlInput: { "aria-label": `rotor window ${index}` },
        }}
        variant="outlined"
        value={displayValue}
        sx={{
          width: 43,
        }}
        onChange={handleChange}
      />
      <IconButton aria-label="Forward" onClick={handleForward}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Stack>
  );
}
