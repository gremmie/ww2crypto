import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { RouterLink } from "../../../../routerLinkComponents/routerLink.tsx";

export default function SetupCompleteAlert() {
  return (
    <Alert severity="success" sx={{ width: "80%" }}>
      <Typography variant="body1" component="span">
        Setup complete. You may now{" "}
        <RouterLink
          variant="inherit"
          sx={{ verticalAlign: "baseline" }}
          to="/enigma/operate"
        >
          operate
        </RouterLink>{" "}
        your Enigma machine!
      </Typography>
    </Alert>
  );
}
