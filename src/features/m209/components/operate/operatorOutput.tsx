import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { CopyButton } from "../../../common/components/copyButton.tsx";
import { outputTextCleared, selectOutputText } from "../../m209Slice.ts";

export const OperatorOutput = () => {
  const dispatch = useAppDispatch();
  const outputText = useAppSelector(selectOutputText);
  const isOutputTextEmpty = outputText.length === 0;

  const handleClear = () => {
    dispatch(outputTextCleared());
  };

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Button
          variant="text"
          disabled={isOutputTextEmpty}
          onClick={handleClear}
        >
          Clear
        </Button>
        <CopyButton textToCopy={outputText} />
      </Stack>
      <TextField
        id="m209-operator-output"
        label="Output"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={outputText}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    </Stack>
  );
};
