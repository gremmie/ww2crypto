import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../app/hooks.ts";
import { selectOutputText } from "./enigmaSlice.ts";

export default function OperatorOutput() {
  const outputText = useAppSelector(selectOutputText);

  return (
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
  );
}
