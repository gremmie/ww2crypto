import CableIcon from "@mui/icons-material/Cable";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { plugboardConnected, selectPlugboard } from "./enigmaSlice.ts";
import PlugboardConnections from "./PlugboardConnections.tsx";
import PlugboardSelect from "./PlugboardSelect.tsx";

export default function EnigmaPlugboard() {
  const dispatch = useAppDispatch();
  const plugboard = useAppSelector(selectPlugboard);
  const [first, setFirst] = React.useState<string | null>(null);
  const [second, setSecond] = React.useState<string | null>(null);

  const connections = plugboard === "" ? [] : plugboard.split(" ");
  const numberOfConnections = connections.length;

  // Choices already in use.
  const inUse =
    numberOfConnections === 0 ? [] : plugboard.replace(" ", "").split("");

  const aCode = "A".charCodeAt(0);
  const choices1 = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(aCode + i),
  ).filter((c) => !inUse.includes(c));
  const choices2 = first == null ? [] : choices1.filter((c) => c !== first);

  const handleConnect = () => {
    if (first === null || second === null) return;
    dispatch(plugboardConnected(first + second));
    setFirst(null);
    setSecond(null);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6">Configure the plugboard</Typography>
      <Alert variant="outlined" severity="info" sx={{ maxWidth: 0.7 }}>
        During the war, procedure required that 10 patch cables were used. For
        simulation purposes you can use anywhere from 0 to 13.
      </Alert>
      <Stack spacing={2} direction="row" justifyContent="center">
        <TextField
          label={`Plugboard Settings (${numberOfConnections})`}
          value={plugboard}
          variant="standard"
          sx={{ width: 350 }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <PlugboardSelect
          label="Plug 1"
          notation="letter"
          disabled={choices1.length === 0}
          value={first}
          choices={choices1}
          onChange={setFirst}
        />
        <CableIcon />
        <PlugboardSelect
          label="Plug 2"
          notation="letter"
          disabled={first === null}
          value={second}
          choices={choices2}
          onChange={setSecond}
        />
        <Button
          variant="contained"
          disabled={first === null || second === null}
          onClick={handleConnect}
        >
          Connect
        </Button>
      </Stack>
      <PlugboardConnections />
    </Stack>
  );
}
