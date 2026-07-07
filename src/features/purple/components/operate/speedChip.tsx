import Chip from "@mui/material/Chip";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectSwitchOrder } from "../../purpleSlice.ts";

interface SpeedChipProps {
  id: number;
}

export const SpeedChip = ({ id }: SpeedChipProps) => {
  const switchOrder = useAppSelector(selectSwitchOrder);
  const parts = switchOrder.split("-").map((s) => parseInt(s));
  if (id > 0) {
    const index = parts.indexOf(id);
    switch (index) {
      case 0:
        return <Chip label="Fast" color="success" />;
      case 1:
        return <Chip label="Middle" color="warning" />;
      case 2:
        return <Chip label="Slow" color="error" />;
      default:
        return null;
    }
  }
  return null;
};
