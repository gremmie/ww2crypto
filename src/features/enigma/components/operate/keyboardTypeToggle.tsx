import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { keyboardTypeChanged, selectKeyboardType } from "../../enigmaSlice.ts";
import type { KeyboardType } from "./keyboardType.ts";

export function KeyboardTypeToggle() {
  const dispatch = useAppDispatch();
  const keyboardType = useAppSelector(selectKeyboardType);

  const handleChange = (newValue: KeyboardType | null) => {
    if (newValue !== null) {
      dispatch(keyboardTypeChanged(newValue));
    }
  };
  return (
    <ToggleButtonGroup
      value={keyboardType}
      exclusive
      onChange={(_, newMode: KeyboardType | null) => handleChange(newMode)}
      size="small"
      aria-label="keyboard type"
    >
      <ToggleButton value="raw" aria-label="default">
        <DesktopWindowsOutlinedIcon />
      </ToggleButton>
      <ToggleButton value="buffered" aria-label="mobile">
        <PhoneIphoneIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
