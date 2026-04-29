import CheckIcon from "@mui/icons-material/Check";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectedWheelPinsChanged,
  selectSelectedWheel,
} from "../../m209Slice.ts";
import { isValidWheelPins } from "../../utils.ts";

export const BulkSetWheelPins = () => {
  const dispatch = useAppDispatch();
  const selectedWheel = useAppSelector(selectSelectedWheel);
  const [hasPasted, setHasPasted] = useState(false);
  const pasteTooltip = hasPasted ? "Pasted!" : "Paste from clipboard";
  const [pinText, setPinText] = useState("");

  const handlePinTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinText(e.target.value);
  };

  const handlePaste = async () => {
    const pastedText = await navigator.clipboard.readText();
    setPinText(pastedText);
    setHasPasted(true);
    setTimeout(() => setHasPasted(false), 1500);
  };

  const handleBulkSet = () => {
    dispatch(selectedWheelPinsChanged(pinText));
    setPinText("");
  };

  const isBulkSetDisabled =
    pinText.trim() === "" || !isValidWheelPins(selectedWheel, pinText);

  return (
    <>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="set-pins-input">Bulk Set Pins</InputLabel>
        <FilledInput
          id="set-pins-input"
          type="text"
          value={pinText}
          onChange={handlePinTextChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="paste from clipboard"
                edge="end"
                onClick={handlePaste}
              >
                <Tooltip title={pasteTooltip}>
                  {hasPasted ? (
                    <CheckIcon
                      sx={{ color: (theme) => theme.palette.success.main }}
                    />
                  ) : (
                    <ContentPasteIcon />
                  )}
                </Tooltip>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="outlined"
        sx={{ alignSelf: "self-end" }}
        disabled={isBulkSetDisabled}
        onClick={handleBulkSet}
      >
        Bulk Set Pins
      </Button>
    </>
  );
};
