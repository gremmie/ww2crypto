import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { KeyWheel } from "./keyWheel.tsx";

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
            <KeyWheel id={n} />
          ))}
        </Stack>
        <Stack
          spacing={{ xs: 2, md: 4 }}
          direction={{ xs: "column", md: "row" }}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <p>Operator Input goes here</p>
          <p>Operator Output goes here</p>
        </Stack>
      </Stack>
    </Box>
  );
};
