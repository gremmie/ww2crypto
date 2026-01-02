import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { ReactElement } from "react";
import { useAppSelector } from "../../app/hooks.ts";
import { selectNumberOfRotors } from "./enigmaSlice.ts";
import RotorWindow from "./RotorWindow.tsx";

export default function OperateView() {
  const numRotors = useAppSelector(selectNumberOfRotors);
  const rotorWindows: ReactElement[] = [];
  for (let i = 0; i < numRotors; ++i) {
    rotorWindows.push(<RotorWindow key={i} index={i} />);
  }

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} alignItems="center">
        <Stack spacing={2} direction="row">
          {rotorWindows}
        </Stack>
      </Stack>
    </Box>
  );
}
