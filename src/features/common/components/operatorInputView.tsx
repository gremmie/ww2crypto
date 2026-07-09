import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { type JSX } from "react";
import { CopyButton } from "./copyButton.tsx";
import { PasteButton } from "./pasteButton.tsx";

interface OperatorInputViewProps {
  id: string;
  value: string;
  /** Whether the current input text is valid; controls the Format button. */
  inputValid: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
  onPaste: (text: string) => void;
  onFormat: () => void;
  /** Machine-specific convert control (Convert vs Encrypt/Decrypt, etc.). */
  convertButton: React.ReactNode;
}

export function OperatorInputView(props: OperatorInputViewProps): JSX.Element {
  const inputEmpty = props.value.length === 0;

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
        <Button variant="text" disabled={inputEmpty} onClick={props.onClear}>
          Clear
        </Button>
        <div>
          <CopyButton textToCopy={props.value} />
          <PasteButton processPaste={props.onPaste} />
        </div>
      </Stack>
      <TextField
        id={props.id}
        label="Input"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "space-between" }}
      >
        <Button
          variant="outlined"
          disabled={inputEmpty || props.inputValid}
          onClick={props.onFormat}
        >
          Format
        </Button>
        {props.convertButton}
      </Stack>
    </Stack>
  );
}
