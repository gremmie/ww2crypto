import CableIcon from "@mui/icons-material/Cable";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  plugboardConnected,
  selectPlugboard,
  selectPlugboardCableCount,
  selectPlugboardNotation,
} from "../../enigmaSlice.ts";
import PlugboardSelect from "./plugboardSelect.tsx";

export default function PlugboardConnector() {
  const dispatch = useAppDispatch();
  const plugboard = useAppSelector(selectPlugboard);
  const notation = useAppSelector(selectPlugboardNotation);
  const cableCount = useAppSelector(selectPlugboardCableCount);

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
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
      useFlexGap
      flexWrap="wrap"
    >
      <PlugboardSelect
        label="Plug 1"
        notation={notation}
        disabled={cableCount === connections.length || choices1.length === 0}
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
  );
}
