import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../../app/hooks.ts";
import { RouterLink } from "../../../../routerLinkComponents/routerLink.tsx";
import { currentTabChanged } from "../../enigmaSlice.ts";

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
          <RouterLink
            variant="inherit"
            onClick={() => dispatch(currentTabChanged("setup"))}
            sx={{ verticalAlign: "baseline" }}
            to="/enigma/setup/model"
          >
            setting up
          </RouterLink>{" "}
          the machine.
        </Typography>
      </Stack>
    </Box>
  );
}
