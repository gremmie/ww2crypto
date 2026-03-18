import Slider from "@mui/material/Slider";
import { useState } from "react";

interface DrumBarProps {
  id: number;
}

export default function DrumBar(props: DrumBarProps) {
  const [value, setValue] = useState<number[]>([1, 6]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") return;

    // Lugs cannot occupy the same position.
    // If a lug is in a zero position, it cannot have an immediate neighbor as
    // there isn't room.
    const invalidValue =
      newValue[0] === newValue[1] ||
      (newValue[0] === 0 && newValue[1] === 1) ||
      (newValue[0] === 1 && newValue[1] === 2) ||
      (newValue[0] === 5 && newValue[1] === 6) ||
      (newValue[0] === 6 && newValue[1] === 7);

    if (!invalidValue) {
      setValue(newValue);
    }
  };

  return (
    <Slider
      getAriaLabel={() => `Drum Bar ${props.id}`}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="off"
      getAriaValueText={(n) => `${n}`}
      shiftStep={1}
      step={1}
      marks={marks}
      min={0}
      max={7}
      track={false}
    />
  );
}

const marks = [
  {
    value: 0,
    label: "1",
  },
  {
    value: 1,
    label: "0",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "0",
  },
  {
    value: 7,
    label: "6",
  },
];
