import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Tooltip } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  type NotationType,
  plugboardNotationChanged,
  selectPlugboardNotation,
} from "../../enigmaSlice.ts";
import NotationSelector from "./notationSelector.tsx";
import PlugboardCableCountSelect from "./plugboardCableCountSelect.tsx";
import PlugboardConnections from "./plugboardConnections.tsx";
import PlugboardConnector from "./plugboardConnector.tsx";
import PlugboardTextInput from "./plugboardTextInput.tsx";

export default function EnigmaPlugboard() {
  const dispatch = useAppDispatch();
  const notation = useAppSelector(selectPlugboardNotation);

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
      <PlugboardConnector />
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
