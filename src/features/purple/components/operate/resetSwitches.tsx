import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { playClickSound } from "../../../common/actions.ts";
import { selectSwitchPositions, switchesReset } from "../../purpleSlice.ts";

export const ResetSwitches = () => {
  const dispatch = useAppDispatch();
  const switchPositions = useAppSelector(selectSwitchPositions);
  const isReset = switchPositions.every((pos) => pos === 0);

  const handleClick = () => {
    dispatch(switchesReset());
    dispatch(playClickSound());
  };

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleClick}
      disabled={isReset}
    >
      Reset Switches
    </Button>
  );
};
