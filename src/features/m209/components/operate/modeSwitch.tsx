import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectMode, toggleMode } from "../../m209Slice.ts";

export const ModeSwitch = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const isCipherMode = mode === "cipher";

  const handleChange = () => {
    dispatch(toggleMode());
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        alignItems: "center",
      }}
    >
      <Typography color={isCipherMode ? "primary" : "secondary"}>
        Cipher
      </Typography>
      <Switch
        checked={!isCipherMode}
        onChange={handleChange}
        slotProps={{ input: { "aria-label": "Cipher/Decipher" } }}
      />
      <Typography color={!isCipherMode ? "primary" : "secondary"}>
        Decipher
      </Typography>
    </Stack>
  );
};
