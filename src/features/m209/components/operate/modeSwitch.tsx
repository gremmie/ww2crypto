import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { playClickSound } from "../../../common/actions.ts";
import { selectMode, toggleMode } from "../../m209Slice.ts";

export const ModeSwitch = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const isCipherMode = mode === "cipher";

  const handleChange = () => {
    dispatch(toggleMode());
    dispatch(playClickSound());
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        alignItems: "center",
      }}
    >
      <Typography color={isCipherMode ? "primary" : "secondary"}>C</Typography>
      <Tooltip title="Cipher / Decipher Mode" arrow>
        <Switch
          checked={!isCipherMode}
          onChange={handleChange}
          slotProps={{ input: { "aria-label": "Cipher/Decipher" } }}
        />
      </Tooltip>
      <Typography color={!isCipherMode ? "primary" : "secondary"}>D</Typography>
    </Stack>
  );
};
