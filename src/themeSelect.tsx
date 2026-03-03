import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";

export function ThemeSelect() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as "system" | "light" | "dark");
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="filled">
        <InputLabel id="theme-select-label">Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          id="theme-select"
          value={mode}
          label="Theme"
          size="small"
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value="system">System</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
