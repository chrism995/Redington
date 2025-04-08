import { CalculationOperation } from "./types";

type CalculationFunction = (
  probabilityA: number,
  probabilityB: number
) => number;

const calculationRegistry: Record<CalculationOperation, CalculationFunction> = {
  combinedWith: (probabilityA, probabilityB) => probabilityA * probabilityB,
  either: (probabilityA, probabilityB) =>
    probabilityA + probabilityB - probabilityA * probabilityB,
};

export function calculateProbability(
  probabilityA: number,
  probabilityB: number,
  operation: CalculationOperation
): number {
  const calculationFn = calculationRegistry[operation];

  if (!calculationFn) {
    // Implement error logging at later date
    console.error("The expected operation is not available in the registry.");
    return 0;
  }

  return calculationFn(probabilityA, probabilityB);
}

/**
 * @returns Array of operation details including id, name, description, and formula for the front end to be dynamically generated
 */
export function getAvailableOperations(): Array<{
  id: CalculationOperation;
  name: string;
  description: string;
  formula: string;
}> {
  return [
    {
      id: "combinedWith",
      name: "Combined With",
      description:
        "Calculates the probability of both events occurring together",
      formula: "P(A and B) = P(A) × P(B)",
    },
    {
      id: "either",
      name: "Either",
      description: "Calculates the probability of either event occurring",
      formula: "P(A or B) = P(A) + P(B) - P(A) × P(B)",
    },
  ];
}

// Export individual calculation functions for testing
export const { combinedWith: calculateCombined, either: calculateEither } =
  calculationRegistry;
