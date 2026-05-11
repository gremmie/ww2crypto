import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  bulkSetLugs,
  resetAllLugs,
  selectDrumState,
  sortAllLugs,
} from "../../m209Slice.ts";
import {
  drumLugStateToStr,
  parseDrumLugStr,
  sortDrumState,
} from "../../utils.ts";
import Divider from "@mui/material/Divider";

export default function DrumSetupControls() {
  const dispatch = useAppDispatch();
  const drumState = useAppSelector(selectDrumState);
  const lugSettings = drumLugStateToStr(drumState);

  const [hasCopied, setHasCopied] = useState(false);
  const copyTooltip = hasCopied ? "Copied!" : "Copy to clipboard";

  const [hasPasted, setHasPasted] = useState(false);
  const pasteTooltip = hasPasted ? "Pasted!" : "Paste from clipboard";
  const [lugText, setLugText] = useState("");

  const allLugsZero = drumState.every(
    (setting) => setting[0] === 0 && setting[1] === 0,
  );
  const sortedDrumState = sortDrumState(drumState);
  const allLugsSorted = drumState.every((pair, index) => {
    const sortedPair = sortedDrumState[index];
    return sortedPair && pair[0] == sortedPair[0] && pair[1] === sortedPair[1];
  });

  const handleLugTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLugText(e.target.value);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(lugSettings);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);
  };

  const handlePaste = async () => {
    const pastedText = await navigator.clipboard.readText();
    setLugText(pastedText);
    setHasPasted(true);
    setTimeout(() => setHasPasted(false), 1500);
  };

  const lugTextResult = parseDrumLugStr(lugText);

  const handleBulkSetLugs = () => {
    if (lugTextResult.isValid) {
      dispatch(bulkSetLugs(lugTextResult.drumState));
      setLugText("");
    }
  };

  return (
    <Stack direction="column" spacing={2} sx={{ width: 350 }}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="lug-settings-display">
          Current Lug Settings
        </InputLabel>
        <FilledInput
          id="lug-settings-display"
          type="text"
          multiline
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          value={lugSettings}
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
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="set-lugs-input">Bulk Set Lugs</InputLabel>
        <FilledInput
          id="set-lugs-input"
          type="text"
          multiline
          value={lugText}
          onChange={handleLugTextChange}
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
        disabled={!lugTextResult.isValid}
        onClick={handleBulkSetLugs}
      >
        Bulk Set Lugs
      </Button>
      <Divider variant="middle" />
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-evenly" }}
      >
        <Button
          variant="outlined"
          disabled={allLugsZero}
          onClick={() => dispatch(resetAllLugs())}
        >
          Reset All Lugs
        </Button>
        <Button
          variant="outlined"
          disabled={allLugsSorted}
          onClick={() => dispatch(sortAllLugs())}
        >
          Sort Lugs
        </Button>
      </Stack>
    </Stack>
  );
}
