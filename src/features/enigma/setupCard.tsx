import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, CardHeader, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { MachineConfig } from "./config/machineConfig.ts";
import { setupSummary } from "./utils.ts";

interface SetupCardProps {
  config: MachineConfig;
  isSelected: boolean;
  selectedCallback: (config: MachineConfig) => void;
  deleteCallback: (config: MachineConfig) => void;
}

export default function SetupCard(props: SetupCardProps) {
  const createdAt = new Date(props.config.createdAt);
  return (
    <Card
      variant={props.isSelected ? "outlined" : undefined}
      sx={{ minWidth: 275 }}
    >
      <CardActionArea
        onClick={() => props.selectedCallback(props.config)}
        sx={{
          minWidth: 275,
          "&[data-active]": {
            backgroundColor: "action.selected",
          },
          "&:hover": {
            backgroundColor: "action.selectedHover",
          },
        }}
        data-active={props.isSelected ? "" : undefined}
      >
        <CardHeader
          title={props.config.name}
          subheader={createdAt.toLocaleString()}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {setupSummary(props.config)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Tooltip title="Delete Setup">
          <IconButton
            aria-label="delete"
            sx={{ ml: "auto" }}
            onClick={() => props.deleteCallback(props.config)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
