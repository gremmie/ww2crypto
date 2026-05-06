import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { MachineConfig } from "../../common/config/machineConfig.ts";
import { ConfigSummary } from "./configSummary.tsx";

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
      </CardActionArea>
      <CardContent sx={{ pt: 0 }}>
        <ConfigSummary config={props.config} />
      </CardContent>
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
