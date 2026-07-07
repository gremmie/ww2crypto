import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
        <div>Mode Switch</div>
        <div>Input & Output Windows</div>
      </Stack>
    </Box>
  );
};
