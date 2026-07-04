import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { CopyButton } from "../../../common/components/copyButton.tsx";
import { PasteButton } from "../../../common/components/pasteButton.tsx";
import { SpecialFont } from "../../../common/components/specialFont.tsx";
import { plugboardSet, selectPlugboard } from "../../purpleSlice.ts";
import { isValidPlugboardStr } from "../../utils.ts";

export const Plugboard = () => {
  const dispatch = useAppDispatch();
  const [newValue, setNewValue] = useState("");
  const plugboardValue = useAppSelector(selectPlugboard);
  const sixes = plugboardValue.slice(0, 6);
  const twenties = plugboardValue.slice(-20);

  const handlePlugboardTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewValue(e.currentTarget.value);
  };

  const handlePaste = async () => {
    const pastedText = await navigator.clipboard.readText();
    setNewValue(pastedText);
  };

  const handleSet = () => {
    dispatch(plugboardSet(newValue));
    setNewValue("");
  };

  return (
    <Stack direction="column" spacing={2} sx={{ alignItems: "center", pb: 2 }}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6" sx={{ pt: 0.6 }}>
          Plugboard Wiring
        </Typography>
        <CopyButton textToCopy={plugboardValue} />
      </Stack>
      <Box>
        <SpecialFont
          variant="h6"
          component="span"
          sx={{ color: "primary.main", pt: 0.6 }}
        >
          {sixes}
        </SpecialFont>
        <SpecialFont variant="h6" component="span" sx={{ pt: 0.6 }}>
          {twenties}
        </SpecialFont>
      </Box>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="set-plugboard-input">Plugboard Wiring</InputLabel>
        <FilledInput
          id="set-plugboard-input"
          type="text"
          value={newValue}
          onChange={handlePlugboardTextChange}
          sx={{ width: "40ch" }}
          endAdornment={
            <InputAdornment position="end">
              <PasteButton processPaste={handlePaste} />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="outlined"
        disabled={!isValidPlugboardStr(newValue)}
        onClick={handleSet}
      >
        Set
      </Button>
    </Stack>
  );
};
