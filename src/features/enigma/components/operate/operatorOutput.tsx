import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  operatorClearedOutput,
  outputGroupSwitchChanged,
  selectIsOutputGrouped,
  selectOutputText,
} from "../../enigmaSlice.ts";
import { groupText } from "../../utils.ts";
import { CopyButton } from "./copyButton.tsx";
import GroupTextSwitch from "./groupTextSwitch.tsx";

export default function OperatorOutput() {
  const dispatch = useAppDispatch();
  const outputText = useAppSelector(selectOutputText);
  const isGrouped = useAppSelector(selectIsOutputGrouped);

  const handleClear = () => {
    dispatch(operatorClearedOutput());
  };

  return (
    <Stack direction="column" spacing={1} sx={{ pt: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Button variant="text" onClick={handleClear}>
          Clear
        </Button>
        <GroupTextSwitch
          value={isGrouped}
          onChange={() => dispatch(outputGroupSwitchChanged(!isGrouped))}
        />
        <CopyButton textToCopy={outputText} isGrouped={isGrouped} />
      </Stack>
      <TextField
        id="enigma-operator-output"
        label="Output"
        multiline
        rows={4}
        variant="filled"
        sx={{
          width: { xs: "96vw", sm: 430 },
        }}
        value={isGrouped ? groupText(outputText) : outputText}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    </Stack>
  );
}
