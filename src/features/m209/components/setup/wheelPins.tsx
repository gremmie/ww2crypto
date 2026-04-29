import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectedWheelPinsChanged,
  selectSelectedWheel,
  selectSelectedWheelState,
} from "../../m209Slice.ts";
import { KEY_WHEEL_DATA } from "../../machine/wheelData.ts";

export const WheelPins = () => {
  const dispatch = useAppDispatch();
  const selectedWheel = useAppSelector(selectSelectedWheel);
  const pinSettings = useAppSelector(selectSelectedWheelState);
  const pinSet = new Set(pinSettings);
  const wheelData = KEY_WHEEL_DATA[selectedWheel];
  if (!wheelData) return null;
  const wheelLetters = wheelData.letters;

  const handlePinChange = (pin: string) => {
    const newPins = new Set(pinSet);
    if (newPins.has(pin)) {
      newPins.delete(pin);
    } else {
      newPins.add(pin);
    }
    dispatch(selectedWheelPinsChanged([...newPins].toSorted().join("")));
  };

  return (
    <FormGroup>
      {Array.from(wheelLetters, (pin) => {
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
  );
};
