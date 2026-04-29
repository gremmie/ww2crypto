import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import type { ReactElement } from "react";
import { BulkSetWheelPins } from "./bulkSetWheelPins.tsx";
import { ResetAllPinsButton } from "./resetAllPinsButton.tsx";
import { WheelPins } from "./wheelPins.tsx";
import { WheelSelect } from "./wheelSelect.tsx";
import { WheelStatus } from "./wheelStatus.tsx";

export const WheelSetup = (): ReactElement => {
  return (
    <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
      <WheelSelect />
      <Stack direction="row" spacing={4}>
        <WheelPins />
        <Stack direction="column" spacing={2}>
          <WheelStatus />
          <BulkSetWheelPins />
          <Divider />
          <ResetAllPinsButton />
        </Stack>
      </Stack>
    </Stack>
  );
};
