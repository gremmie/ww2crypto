import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks.ts";
import { selectIsSetupComplete } from "./enigmaSlice.ts";
import OperateEmptyView from "./OperateEmptyView.tsx";

export function EnigmaOperateTab() {
  const isSetupComplete = useAppSelector(selectIsSetupComplete);

  return (
    <>
      {isSetupComplete && (
        <Box>
          <Typography variant="h4">Operate stuff goes here</Typography>
        </Box>
      )}
      {!isSetupComplete && <OperateEmptyView />}
    </>
  );
}
