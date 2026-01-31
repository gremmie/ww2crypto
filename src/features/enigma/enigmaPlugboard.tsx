import CableIcon from "@mui/icons-material/Cable";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  type NotationType,
  plugboardConnected,
  plugboardNotationChanged,
  selectPlugboard,
  selectPlugboardCableCount,
  selectPlugboardNotation,
} from "./enigmaSlice.ts";
import NotationSelector from "./notationSelector.tsx";
import PlugboardCableCountSelect from "./plugboardCableCountSelect.tsx";
import PlugboardConnections from "./plugboardConnections.tsx";
import PlugboardSelect from "./plugboardSelect.tsx";
import PlugboardTextInput from "./plugboardTextInput.tsx";

export default function EnigmaPlugboard() {
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

  const handleNotationChange = (choice: NotationType) => {
    dispatch(plugboardNotationChanged(choice));
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography
        variant="h6"
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        Configure the plugboard{" "}
        <Tooltip title={plugboardHelp} arrow enterTouchDelay={350}>
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={"center"}
      >
        <PlugboardCableCountSelect />
        <NotationSelector
          currentNotation={notation}
          onChange={handleNotationChange}
        />
      </Stack>
      <PlugboardConnections />
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <PlugboardSelect
          label="Plug 1"
          notation={notation}
          disabled={cableCount === connections.length || choices1.length === 0}
          value={first}
          choices={choices1}
          onChange={setFirst}
        />
        <CableIcon
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        />
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
      <Typography variant="h6" component="span">
        Or
      </Typography>
      <PlugboardTextInput />
    </Stack>
  );
}

const plugboardHelp =
  "During the war, procedure required that 10 patch cables were used. For " +
  "simulation purposes you can use anywhere from 0 to 13.";
