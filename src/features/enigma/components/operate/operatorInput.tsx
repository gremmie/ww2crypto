import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  bufferedTextChanged,
  inputGroupSwitchChanged,
  operatorClearedInput,
  operatorKeyPressed,
  operatorKeyReleased,
  operateSentBulkText,
  selectBufferedText,
  selectInputText,
  selectIsInputGrouped,
} from "../../enigmaSlice.ts";
import { groupText } from "../../utils.ts";
import { CopyButton } from "./copyButton.tsx";
import GroupTextSwitch from "./groupTextSwitch.tsx";
import type { KeyboardType } from "./keyboardType.ts";
import { KeyboardTypeToggle } from "./keyboardTypeToggle.tsx";

const validKeyPattern = /^[a-zA-Z]$/;

export default function OperatorInput() {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectInputText);
  const isGrouped = useAppSelector(selectIsInputGrouped);
  const [keyboardMode, setKeyboardMode] = React.useState<KeyboardType>("raw");
  const bufferedText = useAppSelector(selectBufferedText);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyboardMode === "buffered") return;
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
    if (keyboardMode === "buffered") return;
    dispatch(operatorKeyReleased());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (keyboardMode === "raw") return;
    dispatch(bufferedTextChanged(event.target.value));
  };

  const handleProcessBuffered = () => {
    if (keyboardMode === "raw") return;
    const validText = filterInputText(bufferedText);
    if (validText.length > 0) {
      dispatch(operateSentBulkText(validText));
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
    const validText = filterInputText(text);
    if (keyboardMode === "raw" && validText.length !== 0) {
      dispatch(operateSentBulkText(validText));
    } else if (keyboardMode === "buffered") {
      dispatch(bufferedTextChanged(validText));
    }
  };

  const handleClear = () => {
    dispatch(operatorClearedInput());
  };

  const inputValue = keyboardMode === "raw" ? inputText : bufferedText;

  return (
    <Stack direction="column" spacing={1}>
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="text" onClick={handleClear}>
          Clear
        </Button>
        <KeyboardTypeToggle
          initialValue={keyboardMode}
          onChange={setKeyboardMode}
        />
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
        label={keyboardMode === "raw" ? "Raw Input" : "Buffered Input"}
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={isGrouped ? groupText(inputValue) : inputValue}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
        onChange={handleChange}
      />
      {keyboardMode === "buffered" && (
        <Button variant="contained" onClick={handleProcessBuffered}>
          Process Text
        </Button>
      )}
    </Stack>
  );
}

const filterInputText = (text: string) =>
  text
    .split("")
    .filter((s) => validKeyPattern.test(s))
    .join("")
    .toUpperCase();
