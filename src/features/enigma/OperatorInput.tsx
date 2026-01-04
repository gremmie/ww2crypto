import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  operatorClearedInput,
  operatorKeyPressed,
  operatorPastedText,
  selectInputText,
} from "./enigmaSlice.ts";

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    processPaste(pastedText);
  };

  const handlePasteClick = async () => {
    const pastedText = await navigator.clipboard.readText();
    processPaste(pastedText);
  };

  const processPaste = (text: string) => {
    const validText = text
      .split("")
      .filter((s) => validKeyPattern.test(s))
      .join("")
      .toUpperCase();
    if (validText.length !== 0) {
      dispatch(operatorPastedText(validText));
    }
  };

  const handleClear = () => {
    dispatch(operatorClearedInput());
  };

  return (
    <Stack direction="column" spacing={1}>
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
        onPaste={handlePaste}
        // TODO: handle paste
        // onPaste = {}
      />
      <Stack direction="row" justifyContent="space-between">
        <Button variant="text" onClick={handleClear}>
          Clear
        </Button>
        <Tooltip title="Paste from clipboard">
          <IconButton aria-label="Paste" onClick={handlePasteClick}>
            <ContentPasteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
