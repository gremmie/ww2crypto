import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectedWheelPinsChanged,
  selectSelectedWheelState,
} from "../../m209Slice.ts";

export const ResetAllPinsButton = () => {
  const dispatch = useAppDispatch();
  const effectivePins = useAppSelector(selectSelectedWheelState);
  const isDisabled = effectivePins === "";

  const handleClick = () => {
    dispatch(selectedWheelPinsChanged(""));
  };

  return (
    <Button
      variant="outlined"
      disabled={isDisabled}
      onClick={handleClick}
      sx={{ alignSelf: "center" }}
    >
      Reset All Pins
    </Button>
  );
};
