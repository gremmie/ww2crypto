import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { playClickSound } from "../../../common/actions.ts";
import NumberSpinner from "../../../common/components/numberSpinner.tsx";
import {
  selectSwitchPosition,
  switchPositionUpdated,
} from "../../purpleSlice.ts";
import { SpeedChip } from "./speedChip.tsx";

interface SwitchDisplayProps {
  id: number;
}

export const SwitchDisplay = ({ id }: SwitchDisplayProps) => {
  const dispatch = useAppDispatch();
  const position = useAppSelector((s) => selectSwitchPosition(s, id));
  const label = id === 0 ? "Sixes" : `Twenties #${id}`;

  const handleValueChange = (value: number | null) => {
    if (value === null || value === undefined || value < 1 || value > 25) {
      console.log(`Invalid value: ${value}. Must be between 1 and 25.`);
      return;
    }
    dispatch(switchPositionUpdated({ newPos: value - 1, index: id }));
    dispatch(playClickSound());
  };

  return (
    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
      <NumberSpinner
        label={label}
        min={1}
        max={25}
        value={position + 1}
        width={"6ch"}
        onValueCommitted={handleValueChange}
      />
      <SpeedChip id={id} />
    </Stack>
  );
};
