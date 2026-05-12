import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";

export interface RollerProps {
  handleUp: () => void;
  handleDown: () => void;
  hideUp?: boolean;
  hideDown?: boolean;
  upLabel?: string;
  downLabel?: string;
}

export default function Rollers(props: RollerProps) {
  const hideUp = props.hideUp ?? false;
  const hideDown = props.hideDown ?? false;
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {!hideUp && (
        <IconButton aria-label={props.upLabel ?? "up"} onClick={props.handleUp}>
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
      {!hideDown && (
        <IconButton
          aria-label={props.downLabel ?? "down"}
          onClick={props.handleDown}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      )}
    </Stack>
  );
}
