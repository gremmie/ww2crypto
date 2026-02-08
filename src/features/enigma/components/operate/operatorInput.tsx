import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  inputGroupSwitchChanged,
  operatorClearedInput,
  operatorKeyPressed,
  operatorKeyReleased,
  operatorPastedText,
  selectInputText,
  selectIsInputGrouped,
} from "../../enigmaSlice.ts";
import { groupText } from "../../utils.ts";
import { CopyButton } from "./copyButton.tsx";
import GroupTextSwitch from "./groupTextSwitch.tsx";

const validKeyPattern = /^[a-zA-Z]$/;

export default function OperatorInput() {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectInputText);
  const isGrouped = useAppSelector(selectIsInputGrouped);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // We want keyboard copy & pasting to work, so check for that first.
    if (
      (e.key.toUpperCase() === "V" || e.key.toUpperCase() === "C") &&
      (e.ctrlKey || e.metaKey) &&
      !e.altKey &&
      !e.repeat
    ) {
      return;
    }

    if (
      validKeyPattern.test(e.key) &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.repeat
    ) {
      dispatch(operatorKeyPressed(e.key.toUpperCase()));
    } else {
      e.preventDefault();
    }
  };

  const handleKeyUp = () => {
    dispatch(operatorKeyReleased());
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
      <Stack direction="row" justifyContent="space-between">
        <Button variant="text" onClick={handleClear}>
          Clear
        </Button>
        <GroupTextSwitch
          value={isGrouped}
          onChange={() => dispatch(inputGroupSwitchChanged(!isGrouped))}
        />
        <div>
          <CopyButton textToCopy={inputText} isGrouped={isGrouped} />
          <Tooltip title="Paste from clipboard" arrow>
            <IconButton aria-label="Paste" onClick={handlePasteClick}>
              <ContentPasteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Stack>
      <TextField
        id="enigma-operator-input"
        label="Input"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={isGrouped ? groupText(inputText) : inputText}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
      />
    </Stack>
  );
}
