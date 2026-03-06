import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { KeyboardType } from "./keyboardType.ts";

interface KeyboardTypeToggleProps {
  initialValue: KeyboardType;
  onChange: (newValue: KeyboardType) => void;
}

export function KeyboardTypeToggle(props: KeyboardTypeToggleProps) {
  const handleChange = (newValue: KeyboardType | null) => {
    if (newValue !== null) {
      props.onChange(newValue);
    }
  };
  return (
    <ToggleButtonGroup
      value={props.initialValue}
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
