import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RouterLink } from "../../../../routerLinkComponents/routerLink.tsx";

export default function OperateEmptyView() {
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
