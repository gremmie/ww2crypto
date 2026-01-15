import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { MachineConfig } from "./config/machineConfig.ts";
import { setupSummary } from "./utils.ts";

interface SetupCardProps {
  config: MachineConfig;
  isSelected: boolean;
  selectedCallback: (config: MachineConfig) => void;
}

export default function SetupCard(props: SetupCardProps) {
  return (
    <Card
      variant={props.isSelected ? "outlined" : undefined}
      sx={{ minWidth: 275 }}
    >
      <CardActionArea
        onClick={() => props.selectedCallback(props.config)}
        data-active={props.isSelected ? "" : undefined}
        sx={{
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {props.config.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {setupSummary(props.config)}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </CardActionArea>
    </Card>
  );
}
