/**
 * A mathematical modulo function that always returns a non-negative result if
 * the divisor is positive.
 *
 * @param n {number} - dividend
 * @param d {number} - divisor
 */
export function modulo(n: number, d: number): number {
  return ((n % d) + d) % d;
}
