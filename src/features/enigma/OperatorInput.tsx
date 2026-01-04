import TextField from "@mui/material/TextField";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { operatorKeyPressed, selectInputText } from "./enigmaSlice.ts";

const validKeyPattern = /^[a-zA-Z]$/;

export default function OperatorInput() {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectInputText);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (validKeyPattern.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      dispatch(operatorKeyPressed(e.key.toUpperCase()));
    } else {
      e.preventDefault();
    }
  };

  return (
    <TextField
      id="enigma-operator-input"
      label="Input"
      multiline
      rows={4}
      variant="filled"
      sx={{
        width: 400,
      }}
      value={inputText}
      onKeyDown={handleKeyDown}
      // TODO: handle paste
      // onPaste = {}
    />
  );
}
