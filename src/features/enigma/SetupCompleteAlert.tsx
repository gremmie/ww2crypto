import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../app/hooks.ts";
import { currentTabChanged } from "./enigmaSlice.ts";

export default function SetupCompleteAlert() {
  const dispatch = useAppDispatch();

  return (
    <Alert severity="success" sx={{ width: "80%" }}>
      <Typography variant="body1" component="span">
        Setup complete. You may now{" "}
        <Link
          component="button"
          variant="inherit"
          sx={{ verticalAlign: "baseline" }}
          onClick={() => dispatch(currentTabChanged("operate"))}
        >
          operate
        </Link>{" "}
        your Enigma machine!
      </Typography>
    </Alert>
  );
}
