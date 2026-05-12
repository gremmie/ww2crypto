import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectSelectedWheel, wheelSelected } from "../../m209Slice.ts";

export const WheelSelect = () => {
  const dispatch = useAppDispatch();
  const selectedWheel = useAppSelector(selectSelectedWheel);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const idToButton = (label: number, n: number) => {
    return (
      <ToggleButton key={n} value={n} aria-label={`wheel ${label}`}>
        <SettingsIcon fontSize={isMobile ? "medium" : "large"} sx={{ pr: 1 }} />
        <Typography variant={isMobile ? "body1" : "h6"} component="span">
          {label}
        </Typography>
      </ToggleButton>
    );
  };

  const handleSelect = (newWheel: number | null) => {
    if (newWheel !== null) {
      dispatch(wheelSelected(newWheel));
    }
  };

  return (
    <ToggleButtonGroup
      size="medium"
      exclusive
      value={selectedWheel}
      onChange={(_, newWheel) => handleSelect(newWheel)}
      aria-label="wheel select"
    >
      {[1, 2, 3, 4, 5, 6].map(idToButton)}
    </ToggleButtonGroup>
  );
};
