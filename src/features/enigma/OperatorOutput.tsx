import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { operatorClearedOutput, selectOutputText } from "./enigmaSlice.ts";

export default function OperatorOutput() {
  const dispatch = useAppDispatch();
  const outputText = useAppSelector(selectOutputText);
  const [hasCopied, setHasCopied] = useState(false);

  const handleClear = () => {
    dispatch(operatorClearedOutput());
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  const copyTooltip = hasCopied ? "Copied!" : "Copy to clipboard";

  return (
    <Stack direction="column" spacing={1} sx={{ pt: 4 }}>
      <TextField
        id="enigma-operator-output"
        label="Output"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: 400,
        }}
        value={outputText}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      <Stack direction="row" justifyContent="space-between">
        <Button variant="text" onClick={handleClear}>
          Clear
        </Button>
        <Tooltip title={copyTooltip}>
          <IconButton aria-label="Copy" onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
