import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { operatorClearedOutput, selectOutputText } from "./enigmaSlice.ts";

export default function OperatorOutput() {
  const dispatch = useAppDispatch();
  const outputText = useAppSelector(selectOutputText);

  const handleClear = () => {
    dispatch(operatorClearedOutput());
  };

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
      <Box>
        <Button variant="text" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Stack>
  );
}
