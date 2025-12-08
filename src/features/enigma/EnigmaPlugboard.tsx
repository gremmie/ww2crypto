import CableIcon from "@mui/icons-material/Cable";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  type NotationType,
  plugboardConnected,
  plugboardNotationChanged,
  selectPlugboard,
  selectPlugboardNotation,
} from "./enigmaSlice.ts";
import NotationSelector from "./NotationSelector.tsx";
import PlugboardConnections from "./PlugboardConnections.tsx";
import PlugboardSelect from "./PlugboardSelect.tsx";
import PlugboardSummary from "./PlugboardSummary.tsx";

export default function EnigmaPlugboard() {
  const dispatch = useAppDispatch();
  const plugboard = useAppSelector(selectPlugboard);
  const notation = useAppSelector(selectPlugboardNotation);
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

  const handleNotationChange = (choice: NotationType) => {
    dispatch(plugboardNotationChanged(choice));
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6">Configure the plugboard</Typography>
      <Alert variant="outlined" severity="info" sx={{ maxWidth: 0.7 }}>
        During the war, procedure required that 10 patch cables were used. For
        simulation purposes you can use anywhere from 0 to 13.
      </Alert>
      <NotationSelector
        currentNotation={notation}
        onChange={handleNotationChange}
      />
      <PlugboardSummary />
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <PlugboardSelect
          label="Plug 1"
          notation={notation}
          disabled={choices1.length === 0}
          value={first}
          choices={choices1}
          onChange={setFirst}
        />
        <CableIcon />
        <PlugboardSelect
          label="Plug 2"
          notation={notation}
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
