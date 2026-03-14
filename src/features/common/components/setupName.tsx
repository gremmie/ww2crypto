import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../app/hooks.ts";
import {
  selectActiveConfig,
  selectIsActiveConfigModified,
} from "../../config/configSlice.ts";
import type { MachineType } from "../config/machineType.ts";

interface SetupNameProps {
  machineType: MachineType;
}

export default function SetupName(props: SetupNameProps) {
  const configName =
    useAppSelector((state) => selectActiveConfig(state, props.machineType))
      ?.name ?? "";
  const isNotSaved = configName.length === 0;
  const isModified = useAppSelector((state) =>
    selectIsActiveConfigModified(state, props.machineType),
  );

  const nameSpan = (
    <Typography
      variant="inherit"
      component="span"
      sx={{ fontStyle: isModified || isNotSaved ? "italic" : undefined }}
    >
      {isNotSaved ? "(Not saved)" : configName}
      {isModified && " *"}
    </Typography>
  );
  const setupName = isModified ? (
    <Tooltip title="Has unsaved changes" arrow>
      {nameSpan}
    </Tooltip>
  ) : (
    nameSpan
  );

  return <Typography variant="h5">Setup: {setupName}</Typography>;
}
