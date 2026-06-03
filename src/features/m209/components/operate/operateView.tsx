import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Counter } from "./counter.tsx";
import { KeyWheel } from "./keyWheel.tsx";
import { MainAxle } from "./mainAxle.tsx";
import { ModeSwitch } from "./modeSwitch.tsx";
import { OperatorInput } from "./operatorInput.tsx";
import { OperatorOutput } from "./operatorOutput.tsx";

export const OperateView = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Stack spacing={2} direction="row">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <KeyWheel key={n} id={n} />
          ))}
        </Stack>
        <Stack
          spacing={0}
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <ModeSwitch />
          <Counter />
          <MainAxle />
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
