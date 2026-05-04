import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { MachineConfig } from "../../common/config/machineConfig.ts";
import { setupSummary } from "../../enigma/utils.ts";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";

interface SetupCardProps {
  config: MachineConfig;
  isSelected: boolean;
  clickCallback: (config: MachineConfig) => void;
  dblClickCallback: (config: MachineConfig) => void;
  deleteCallback: (config: MachineConfig) => void;
}

export default function SetupCard(props: SetupCardProps) {
  const createdAt = new Date(props.config.createdAt);
  return (
    <Card
      variant={props.isSelected ? "outlined" : undefined}
      sx={{
        minWidth: 275,
        border: (theme) =>
          props.isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : undefined,
      }}
    >
      <CardActionArea
        onClick={() => props.clickCallback(props.config)}
        onDoubleClick={() => props.dblClickCallback(props.config)}
        sx={{
          minWidth: 275,
        }}
      >
        <CardHeader
          title={props.config.name}
          subheader={createdAt.toLocaleString()}
        />
        <CardContent sx={{ pt: 0 }}>
          {/* Temporary until we sort out M209. */}
          {props.config.type === "enigma" && (
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {setupSummary(props.config)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Tooltip title="Delete Setup" arrow>
          <IconButton
            aria-label="delete"
            sx={{ ml: "auto" }}
            onClick={() => props.deleteCallback(props.config)}
          >
            <DeleteOutlineOutlinedIcon
              sx={{ color: (theme) => theme.palette.error.main }}
            />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
