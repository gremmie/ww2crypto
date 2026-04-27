import SettingsIcon from "@mui/icons-material/Settings";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectSelectedWheel, wheelSelected } from "../../m209Slice.ts";

export const WheelSelect = () => {
  const dispatch = useAppDispatch();
  const selectedWheel = useAppSelector(selectSelectedWheel);

  const handleSelect = (newWheel: number) => {
    dispatch(wheelSelected(newWheel));
  };

  return (
    <ToggleButtonGroup
      size="medium"
      exclusive
      value={selectedWheel}
      onChange={(_, newWheel) => handleSelect(newWheel)}
      aria-label="wheel select"
    >
      {[1, 2, 3, 4, 5, 6].map((label, n) => (
        <ToggleButton key={n} value={n}>
          <SettingsIcon fontSize="large" sx={{ pr: 1 }} />
          <Typography variant="h6" component="span">
            {label}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
