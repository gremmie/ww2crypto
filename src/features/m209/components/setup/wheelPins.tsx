import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { modulo } from "../../../common/utils.ts";
import {
  selectedWheelPinsChanged,
  selectedWheelPositionChanged,
  selectSelectedWheel,
  selectSelectedWheelPosition,
  selectSelectedWheelState,
} from "../../m209Slice.ts";
import { KEY_WHEEL_DATA } from "../../machine/wheelData.ts";
import Rollers from "./rollers.tsx";

export const WheelPins = () => {
  const dispatch = useAppDispatch();
  const selectedWheel = useAppSelector(selectSelectedWheel);
  const pinSettings = useAppSelector(selectSelectedWheelState);
  const pinSet = new Set(pinSettings);
  const wheelLetters = KEY_WHEEL_DATA[selectedWheel]?.letters ?? "";
  const numPins = wheelLetters.length;
  const wheelPosition = useAppSelector(selectSelectedWheelPosition);
  if (!wheelLetters) return null;

  const numVisiblePins = 5;

  const visiblePins = Array.from({ length: numVisiblePins }, (_, i) => {
    const n = modulo(wheelPosition + 2 - i, numPins);
    const letter = wheelLetters[n];
    if (letter) return letter;
    throw new Error("Programming error: letter is undefined");
  });

  const handleBack = () => {
    dispatch(selectedWheelPositionChanged(modulo(wheelPosition - 1, numPins)));
  };
  const handleForward = () => {
    dispatch(selectedWheelPositionChanged(modulo(wheelPosition + 1, numPins)));
  };

  const handlePinChange = (pin: string) => {
    const newPins = new Set(pinSet);
    if (newPins.has(pin)) {
      newPins.delete(pin);
    } else {
      newPins.add(pin);
    }
    dispatch(selectedWheelPinsChanged([...newPins].join("")));
  };

  return (
    <Stack direction="column" spacing={2}>
      <Rollers handleBack={handleBack} handleForward={handleForward} />
      <FormGroup sx={{ pl: 2.5 }}>
        {Array.from(visiblePins, (pin) => {
          const isEffective = pinSet.has(pin);
          return (
            <FormControlLabel
              key={pin}
              control={
                <Switch
                  checked={isEffective}
                  onChange={() => handlePinChange(pin)}
                />
              }
              label={pin}
            />
          );
        })}
      </FormGroup>
      <Rollers handleBack={handleBack} handleForward={handleForward} />
    </Stack>
  );
};
