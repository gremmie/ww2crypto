/**
 * Simulates the drum cage on an M-209 converter.
 *
 * The drum cage consists of 27 bars where each bar has 2 movable lugs. The
 * lugs can be slid into positions numbered 1-6 and/or 2 neutral positions
 * numbered 0. As the drum rotates all 27 bars have a chance for their lugs to
 * interact with 6 guide arms (one for each key wheel), which may or may not be
 * in position. The positioning of the guide arms are controlled by the effective
 * pins on the six key wheels. As each bar rotates past the 6 guide arms for
 * each key wheel, if one or both lugs come into contact with a guide arm, the
 * bar will quickly shift left. This causes the indicator disk to rotate once,
 * thus causing the substitution cipher for the selected letter to change. Thus,
 * the drum, along with the key wheels, acts as a pseudo-random number
 * generator, generating a number between 0 and 27, inclusive. Thus number is
 * used to select which substitution cipher will be used for the current
 * operator selected letter.
 *
 * Internally the bars are represented as a list of 1 or 2 tuples, with one
 * entry for each bar that has 1 or more lugs not in neutral positions.  Bars
 * that have both lugs in neutral positions do not have entries in the list.
 * A bar that has 1 lug in a neutral position, and the other lug in position
 * 3 will have an entry in the list consisting of the 1-tuple [2]. A bar that
 * has one lug in position 2 and one in position 6 will have an entry in the
 * list consisting of the 2-tuple [1, 5]. We subtract one from the position for
 * 0-based indexing reasons.
 *
 * The order of the bars list is not relevant as we only need to simulate
 * complete revolutions of the drum cage.
 */
export default class Drum {
  readonly drumState: ([number, number] | [number])[];
  /**
   * Constructor for the Drum class.
   *
   * @param bars {[number, number][]} - an array of lug-tuples. Each tuple
   * value should be a number from 0-6, where 0 indicates the lug is in a
   * neutral position, and 1-6 indicates which key wheel's guide arm the lug
   * may interact with. The array length must not be greater than 27. Shorter
   * arrays can be passed with the assumption that the missing tuples are
   * for lug pairs that are both in the 0-position.
   */
  constructor(bars: [number, number][]) {
    if (bars.length > 27) {
      throw new RangeError(
        `Invalid number of bars; 27 expected, found ${bars.length}`,
      );
    }
    this.drumState = [];
    for (const lugPair of bars) {
      const leftLug = lugPair[0];
      const rightLug = lugPair[1];
      if (leftLug === 0 && rightLug === 0) continue;
      if (leftLug !== 0 && rightLug !== 0) {
        this.drumState.push([leftLug - 1, rightLug - 1]);
      } else {
        const lugNumber = leftLug !== 0 ? leftLug : rightLug;
        this.drumState.push([lugNumber - 1]);
      }
    }
  }

  /**
   * Rotate the drum cage a complete revolution and return the number of
   * times a bar was shifted to the left.
   *
   * @param pins {boolean[]} - a 6-element array of booleans representing the
   * current effective states of the 6 key wheels.
   * @returns {number} - the count of times a bar was shifted to the left during
   * the rotation.
   */
  rotate(pins: boolean[]): number {
    if (pins.length !== 6) {
      throw new RangeError("pins must be exactly 6 elements");
    }

    let count = 0;
    for (const lugPair of this.drumState) {
      for (const lug of lugPair) {
        if (pins[lug]) {
          ++count;
          break;
        }
      }
    }
    return count;
  }
}
