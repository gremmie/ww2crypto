import Stack from "@mui/material/Stack";
import type { ReactElement } from "react";
import { WheelPins } from "./wheelPins.tsx";
import { WheelSelect } from "./wheelSelect.tsx";
import { WheelStatus } from "./wheelStatus.tsx";

export const WheelSetup = (): ReactElement => {
  return (
    <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
      <WheelSelect />
      <Stack direction="row" spacing={2}>
        <WheelPins />
        <WheelStatus />
      </Stack>
    </Stack>
  );
};
