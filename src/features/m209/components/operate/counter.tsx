import RestartAlt from "@mui/icons-material/RestartAlt";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectCounter } from "../../m209Slice.ts";
import { resetCounter } from "../../m209Thunks.ts";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(selectCounter);
  const counterStr = String(counterValue).padStart(4, "0");

  const handleReset = () => {
    dispatch(resetCounter());
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ width: 100 }}>
      <OutlinedInput
        id="m209-counter"
        aria-label="counter"
        value={counterStr}
        disabled
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="reset" edge="end" onClick={handleReset}>
              <RestartAlt />
            </IconButton>
          </InputAdornment>
        }
      ></OutlinedInput>
    </FormControl>
  );
};
