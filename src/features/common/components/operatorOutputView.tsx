import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { type JSX } from "react";
import { CopyButton } from "./copyButton.tsx";

interface OperatorOutputViewProps {
  id: string;
  value: string;
  onClear: () => void;
}

export function OperatorOutputView(
  props: OperatorOutputViewProps,
): JSX.Element {
  const isOutputTextEmpty = props.value.length === 0;

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Button
          variant="text"
          disabled={isOutputTextEmpty}
          onClick={props.onClear}
        >
          Clear
        </Button>
        <CopyButton textToCopy={props.value} />
      </Stack>
      <TextField
        id={props.id}
        label="Output"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={props.value}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    </Stack>
  );
}
