import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { type ChangeEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { playClickSound } from "../../../common/actions.ts";
import {
  selectWheelLetter,
  wheelAdvanced,
  wheelLetterChanged,
  wheelReversed,
} from "../../m209Slice.ts";
import { KEY_WHEEL_DATA } from "../../machine/wheelData.ts";

interface KeyWheelProps {
  id: number;
}

export const KeyWheel = ({ id }: KeyWheelProps) => {
  const dispatch = useAppDispatch();
  const displayValue = useAppSelector((s) => selectWheelLetter(s, id));
  const validLetters = KEY_WHEEL_DATA[id]!.letters;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = (e.target.value as string).toUpperCase();
    if (
      newValue.length === 1 &&
      validLetters.includes(newValue.toUpperCase())
    ) {
      dispatch(wheelLetterChanged({ wheelId: id, letter: newValue }));
      dispatch(playClickSound());
    }
  };

  const handleBack = () => {
    dispatch(wheelReversed(id));
    dispatch(playClickSound());
  };

  const handleForward = () => {
    dispatch(wheelAdvanced(id));
    dispatch(playClickSound());
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      <IconButton aria-label="Back" onClick={handleBack}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <TextField
        id={`key-wheel-${id}`}
        inputRef={inputRef}
        slotProps={{
          htmlInput: { "aria-label": `Key wheel ${id}` },
        }}
        variant="outlined"
        value={displayValue}
        sx={{
          width: 43,
        }}
        onChange={handleChange}
        onClick={handleSelect}
      />
      <IconButton aria-label="Forward" onClick={handleForward}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Stack>
  );
};
