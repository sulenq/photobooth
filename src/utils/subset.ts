/**
 * Checks if all elements in array A exist in array B.
 *
 * @param A - The array to check if it is a subset.
 * @param B - The array to check against.
 * @returns `true` if A is a subset of B, otherwise `false`.
 */
const subset = <T>(A: T[], B: T[]): boolean => {
  return A.every((value) => B.includes(value));
};

export default subset;
