import RestartAlt from "@mui/icons-material/RestartAlt";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectCounter } from "../../m209Slice.ts";
import { resetCounter } from "../../m209Thunks.ts";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(selectCounter);
  const counterStr = String(counterValue).padStart(4, "0");
  const isDisabled = counterValue === 0;

  const handleReset = () => {
    dispatch(resetCounter());
  };

  return (
    <FormControl variant="filled" size="small" sx={{ width: "14ch" }}>
      <InputLabel htmlFor="m209-counter">Counter</InputLabel>
      <FilledInput
        id="m209-counter"
        aria-label="counter"
        value={counterStr}
        disabled
        sx={{ fontSize: "1.5rem", fontWeight: "bold", fontFamily: "monospace" }}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Reset counter" placement="right" arrow>
              {/* The span is to allow the tooltip even when the button is disabled. */}
              <span>
                <IconButton
                  aria-label="reset"
                  edge="end"
                  disabled={isDisabled}
                  onClick={handleReset}
                >
                  <RestartAlt />
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
