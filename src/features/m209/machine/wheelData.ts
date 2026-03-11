interface KeyWheelData {
  letters: string;
  guideLetter: string;
}

/**
 * This list contains data for each key wheel in an M-209, in order from
 * left to right as an operator faces the machine.
 * The "letters" value is an iterable of letters for that wheel.
 * The "guideLetter" is the letter whose pin interacts with the guide arm
 * when the letter "A" is being displayed to the operator.
 *
 * http://en.wikipedia.org/wiki/M-209
 */
export const KEY_WHEEL_DATA: KeyWheelData[] = [
  {
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    guideLetter: "P",
  },
  {
    letters: "ABCDEFGHIJKLMNOPQRSTUVXYZ",
    guideLetter: "O",
  },
  {
    letters: "ABCDEFGHIJKLMNOPQRSTUVX",
    guideLetter: "N",
  },
  {
    letters: "ABCDEFGHIJKLMNOPQRSTU",
    guideLetter: "M",
  },
  {
    letters: "ABCDEFGHIJKLMNOPQRS",
    guideLetter: "L",
  },
  {
    letters: "ABCDEFGHIJKLMNOPQ",
    guideLetter: "K",
  },
] as const;
