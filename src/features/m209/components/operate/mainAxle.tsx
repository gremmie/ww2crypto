import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../../app/hooks.ts";
import { mainAxleRotated } from "../../m209Thunks.ts";

export const MainAxle = () => {
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(mainAxleRotated(-1));
  };
  const handleForward = () => {
    dispatch(mainAxleRotated(1));
  };

  return (
    <Stack direction="column">
      <IconButton aria-label="Back" onClick={handleBack}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <Typography>Main Axle</Typography>
      <IconButton aria-label="Forward" onClick={handleForward}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Stack>
  );
};
