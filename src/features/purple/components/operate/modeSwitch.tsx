import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { playClickSound } from "../../../common/actions.ts";
import { modeToggled, selectMode } from "../../purpleSlice.ts";

export const ModeSwitch = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const isEncrypt = mode === "encrypt";

  const handleChange = () => {
    dispatch(modeToggled());
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
      <Typography color={isEncrypt ? "primary" : "textSecondary"}>
        Encrypt
      </Typography>
      <Switch
        checked={!isEncrypt}
        onChange={handleChange}
        slotProps={{ input: { "aria-label": "Encrypt/Decrypt" } }}
      />
      <Typography color={!isEncrypt ? "primary" : "textSecondary"}>
        Decrypt
      </Typography>
    </Stack>
  );
};
