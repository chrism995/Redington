/**
 * Calculates the combined probability (AND) of two independent events
 * Formula: P(A and B) = P(A) * P(B)
 *
 * @param probabilityA The probability of event A (between 0 and 1)
 * @param probabilityB The probability of event B (between 0 and 1)
 * @returns The combined probability
 */
export function calculateCombined(
  probabilityA: number,
  probabilityB: number
): number {
  return probabilityA * probabilityB;
}

/**
 * Calculates the probability of either event occurring (OR) for two events
 * Formula: P(A or B) = P(A) + P(B) - P(A) * P(B)
 *
 * @param probabilityA The probability of event A (between 0 and 1)
 * @param probabilityB The probability of event B (between 0 and 1)
 * @returns The probability of either event occurring
 */
export function calculateEither(
  probabilityA: number,
  probabilityB: number
): number {
  return probabilityA + probabilityB - probabilityA * probabilityB;
}

/**
 * Calculates probability based on the chosen operation
 *
 * @param probabilityA The probability of event A (between 0 and 1)
 * @param probabilityB The probability of event B (between 0 and 1)
 * @param operation The calculation type ('combinedWith' or 'either')
 * @returns The calculated probability
 */
export function calculateProbability(
  probabilityA: number,
  probabilityB: number,
  operation: "combinedWith" | "either"
): number {
  if (operation === "combinedWith") {
    return calculateCombined(probabilityA, probabilityB);
  } else {
    return calculateEither(probabilityA, probabilityB);
  }
}
