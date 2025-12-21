import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../app/hooks.ts";
import { currentTabChanged } from "./enigmaSlice.ts";

export default function OperateEmptyView() {
  const dispatch = useAppDispatch();
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 10 }}
    >
      <Stack spacing={2} alignItems="center">
        <Box>
          <SettingsOutlinedIcon sx={{ fontSize: "7rem" }} />
        </Box>
        <Typography variant="h6" sx={{ pt: 2 }}>
          Setup not complete
        </Typography>
        <Typography variant="body1" component="span">
          Please finish{" "}
          <Link
            component="button"
            variant="inherit"
            onClick={() => dispatch(currentTabChanged("setup"))}
            sx={{ verticalAlign: "baseline" }}
          >
            setting up
          </Link>{" "}
          the machine.
        </Typography>
      </Stack>
    </Box>
  );
}
