import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks.ts";
import { selectIsSetupComplete } from "./enigmaSlice.ts";

export function EnigmaOperateTab() {
  const isSetupComplete = useAppSelector(selectIsSetupComplete);

  return (
    <Box>
      <Typography variant="h4">
        {isSetupComplete ? "Operate stuff goes here" : "Operate empty view"}
      </Typography>
    </Box>
  );
}
