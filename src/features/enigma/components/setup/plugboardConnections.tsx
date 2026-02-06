import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  plugboardBulkSet,
  plugboardDisconnected,
  selectPlugboard,
  selectPlugboardNotation,
} from "../../enigmaSlice.ts";
import { toNumericConnection } from "../../utils.ts";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PlugboardConnections() {
  const dispatch = useAppDispatch();
  const plugboard = useAppSelector(selectPlugboard);
  const notation = useAppSelector(selectPlugboardNotation);

  const connections = plugboard === "" ? [] : plugboard.split(" ");
  const connectionCount = connections.length;

  const makeChip = (c: string) => {
    return (
      <ListItem key={c}>
        <Chip
          label={notation == "letter" ? c : toNumericConnection(c)}
          onDelete={() => dispatch(plugboardDisconnected(c))}
        />
      </ListItem>
    );
  };

  const helpText =
    "You may enter the plugboard settings by manually connecting cables or " +
    "by typing a connection string.";

  return (
    <div>
      <Stack spacing={1} alignItems="center">
        <Typography
          variant="subtitle1"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          {`Connections (${connectionCount}):`}
          <Tooltip title={helpText} arrow enterTouchDelay={350}>
            <HelpOutlineOutlinedIcon />
          </Tooltip>
        </Typography>
        {connectionCount > 0 && (
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {connections.map(makeChip)}
          </Paper>
        )}
        {connectionCount == 0 && (
          <Typography sx={{ fontWeight: "lighter", fontStyle: "italic" }}>
            No connections
          </Typography>
        )}
        {connectionCount > 0 && (
          <Button variant="text" onClick={() => dispatch(plugboardBulkSet(""))}>
            Clear all
          </Button>
        )}
      </Stack>
    </div>
  );
}
