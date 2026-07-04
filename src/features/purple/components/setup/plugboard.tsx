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
    <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h6" component="div">
        Plugboard Wiring
      </Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", pb: 2 }}>
        <SpecialFont
          variant="h6"
          component="div"
          sx={{ color: "primary.main", pt: 0.6 }}
        >
          {sixes}
        </SpecialFont>
        <SpecialFont variant="h6" component="div" sx={{ pt: 0.6 }}>
          {twenties}
        </SpecialFont>
        <CopyButton textToCopy={plugboardValue} />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="set-plugboard-input">
            Plugboard Wiring
          </InputLabel>
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
    </Stack>
  );
};
