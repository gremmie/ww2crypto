import Slider from "@mui/material/Slider";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../app/hooks.ts";
import { drumBarChanged, selectDrumBarState } from "../../m209Slice.ts";

interface DrumBarProps {
  id: number;
}

export default function DrumBar(props: DrumBarProps) {
  const dispatch = useDispatch();
  const lugState = useAppSelector((s) => selectDrumBarState(s, props.id));
  if (!lugState) return null;

  const sliderValue = toSliderValue(lugState);

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
      dispatch(
        drumBarChanged({ barId: props.id, newState: toLugPair(newValue) }),
      );
    }
  };

  return (
    <Slider
      getAriaLabel={() => `Drum Bar ${props.id}`}
      value={sliderValue}
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

const leftLugToSliderValue: Map<number, number> = new Map([
  [0, 1],
  [1, 0],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
]);

const rightLugToSliderValue: Map<number, number> = new Map([
  [0, 6],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 7],
]);

const leftSliderToLug = new Map(
  Array.from(leftLugToSliderValue, ([key, value]) => [value, key]),
);

const rightSliderToLug = new Map(
  Array.from(rightLugToSliderValue, ([key, value]) => [value, key]),
);

const toSliderValue = (lugState: [number, number]) => {
  return [
    leftLugToSliderValue.get(lugState[0])!,
    rightLugToSliderValue.get(lugState[1])!,
  ];
};

const toLugPair = (sliderState: number[]): [number, number] => {
  return [
    leftSliderToLug.get(sliderState[0]!)!,
    rightSliderToLug.get(sliderState[1]!)!,
  ];
};
