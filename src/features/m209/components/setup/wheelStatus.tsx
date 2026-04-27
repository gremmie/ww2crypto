import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectSelectedWheel, selectWheelState } from "../../m209Slice.ts";

export const WheelStatus = () => {
  const selectedWheel = useAppSelector(selectSelectedWheel);
  const wheelState = useAppSelector((s) => selectWheelState(s, selectedWheel));
  const [hasCopied, setHasCopied] = React.useState(false);
  const copyTooltip = hasCopied ? "Copied!" : "Copy to clipboard";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(wheelState);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);
  };
  const htmlId = `wheel-state-${selectedWheel}`;

  return (
    <FormControl variant="filled" sx={{ width: "40ch" }}>
      <InputLabel htmlFor={htmlId}>
        Wheel {selectedWheel + 1} Effective Pins
      </InputLabel>
      <FilledInput
        id={htmlId}
        type="text"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        value={wheelState}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="copy to clipboard"
              edge="end"
              onClick={handleCopy}
            >
              <Tooltip title={copyTooltip}>
                {hasCopied ? (
                  <CheckIcon
                    sx={{ color: (theme) => theme.palette.success.main }}
                  />
                ) : (
                  <ContentCopyIcon />
                )}
              </Tooltip>
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
