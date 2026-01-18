import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks.ts";
import { selectConfigName, selectIsConfigModified } from "./enigmaSlice.ts";

export default function SetupName() {
  const configName = useAppSelector(selectConfigName);
  const isNotSaved = configName.length === 0;
  const isModified = useAppSelector(selectIsConfigModified);

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
