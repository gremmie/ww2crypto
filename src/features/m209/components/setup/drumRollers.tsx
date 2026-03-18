import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";

export interface DrumRollerProps {
  handleBack: () => void;
  handleForward: () => void;
}

export default function DrumRollers(props: DrumRollerProps) {
  return (
    <Stack direction="row" spacing={2} display="flex" justifyContent="center">
      <IconButton aria-label="roll drum back" onClick={props.handleBack}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton aria-label="roll drum forward" onClick={props.handleForward}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Stack>
  );
}
