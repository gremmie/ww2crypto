import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { plugboardDisconnected, selectPlugboard } from "./enigmaSlice.ts";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PlugboardConnections() {
  const dispatch = useAppDispatch();
  const plugboard = useAppSelector(selectPlugboard);

  const connections = plugboard === "" ? [] : plugboard.split(" ");

  const makeChip = (c: string) => {
    return (
      <ListItem key={c}>
        <Chip label={c} onDelete={() => dispatch(plugboardDisconnected(c))} />
      </ListItem>
    );
  };

  return (
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
  );
}
