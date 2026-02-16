import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../../app/hooks.ts";
import { RouterLink } from "../../../../routerLinkComponents/routerLink.tsx";
import { currentTabChanged } from "../../enigmaSlice.ts";

export default function SetupCompleteAlert() {
  const dispatch = useAppDispatch();

  return (
    <Alert severity="success" sx={{ width: "80%" }}>
      <Typography variant="body1" component="span">
        Setup complete. You may now{" "}
        <RouterLink
          variant="inherit"
          sx={{ verticalAlign: "baseline" }}
          onClick={() => dispatch(currentTabChanged("operate"))}
          to="/enigma/operate"
        >
          operate
        </RouterLink>{" "}
        your Enigma machine!
      </Typography>
    </Alert>
  );
}
