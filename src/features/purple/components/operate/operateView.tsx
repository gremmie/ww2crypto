import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ModeSwitch } from "./modeSwitch.tsx";
import { OperatorInput } from "./operatorInput.tsx";
import { OperatorOutput } from "./operatorOutput.tsx";
import { ResetSwitches } from "./resetSwitches.tsx";
import { SwitchDisplay } from "./switchDisplay.tsx";

export const PurpleOperateView = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
        <SwitchDisplay id={0} />
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          {[1, 2, 3].map((n) => (
            <SwitchDisplay key={n} id={n} />
          ))}
        </Stack>
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ alignItems: "center", pt: "2" }}
        >
          <ModeSwitch />
          <ResetSwitches />
        </Stack>
        <Stack
          spacing={{ xs: 2, md: 4 }}
          direction={{ xs: "column", md: "row" }}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <OperatorInput />
          <OperatorOutput />
        </Stack>
      </Stack>
    </Box>
  );
};
