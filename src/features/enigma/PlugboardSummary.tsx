import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../app/hooks.ts";
import { selectPlugboard, selectPlugboardNotation } from "./enigmaSlice.ts";
import { toNumericConnection } from "./utils.ts";

export default function PlugboardSummary() {
  const plugboard = useAppSelector(selectPlugboard);
  const notation = useAppSelector(selectPlugboardNotation);

  const connections = plugboard === "" ? [] : plugboard.split(" ");
  const numberOfConnections = connections.length;

  const displayValue = connections
    .map((c) => {
      return notation == "letter" ? c : toNumericConnection(c);
    })
    .join(" ");

  const width = notation === "letter" ? 350 : 520;

  return (
    <TextField
      label={`Plugboard Settings (${numberOfConnections})`}
      value={displayValue}
      variant="standard"
      sx={{ width: width }}
      slotProps={{
        input: {
          readOnly: true,
        },
      }}
    />
  );
}
