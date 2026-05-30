import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { CopyButton } from "../../../common/components/copyButton.tsx";
import { PasteButton } from "../../../common/components/pasteButton.tsx";
import {
  convertInputText,
  formatInputText,
  inputTextChanged,
  selectInputText,
} from "../../m209Slice.ts";

const validTextRegex = /^[a-zA-Z]*$/;

export const OperatorInput = () => {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectInputText);

  const inputEmpty = inputText.length === 0;
  const inputValid = validTextRegex.test(inputText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputTextChanged(event.target.value));
  };
  const handleClear = () => {
    dispatch(inputTextChanged(""));
  };
  const handlePaste = (text: string) => {
    dispatch(inputTextChanged(inputText + text));
  };
  const handleFormatText = () => {
    dispatch(formatInputText());
  };
  const handleConvert = () => {
    dispatch(convertInputText());
  };

  return (
    <Stack direction="column" spacing={1}>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="text" disabled={inputEmpty} onClick={handleClear}>
          Clear
        </Button>
        <div>
          <CopyButton textToCopy={inputText} />
          <PasteButton processPaste={handlePaste} />
        </div>
      </Stack>
      <TextField
        id="m209-operator-input"
        label="Input"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={inputText}
        onChange={handleChange}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "space-between" }}
      >
        <Button
          variant="outlined"
          disabled={inputEmpty || inputValid}
          onClick={handleFormatText}
        >
          Format
        </Button>
        <Button
          variant="contained"
          disabled={inputEmpty || !inputValid}
          onClick={handleConvert}
        >
          Convert
        </Button>
      </Stack>
    </Stack>
  );
};
