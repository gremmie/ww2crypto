import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { RouterLink } from "../../../routerLinkComponents/routerLink.tsx";
import type { TRoutes } from "../../../routeTypes.ts";
import type { MachineType } from "../config/machineType.ts";

interface SetupCompleteAlertProps {
  machineType: MachineType;
  operatePath: TRoutes;
}

export default function SetupCompleteAlert(props: SetupCompleteAlertProps) {
  const machineName = () => {
    switch (props.machineType) {
      case "enigma":
        return "Enigma Machine";
      case "m209":
        return "M-209";
      case "purple":
        return "PURPLE Machine";
    }
  };

  return (
    <Alert severity="success" sx={{ width: "80%" }}>
      <Typography variant="body1" component="span">
        Setup complete. You may now{" "}
        <RouterLink
          variant="inherit"
          sx={{ verticalAlign: "baseline" }}
          to={props.operatePath}
        >
          operate
        </RouterLink>{" "}
        your {machineName()}!
      </Typography>
    </Alert>
  );
}
