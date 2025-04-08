import {
  calculateCombined,
  calculateEither,
  calculateProbability,
} from "@/lib/calculations";

describe("Probability Calculations", () => {
  describe("calculateCombined", () => {
    it("calculates the combined probability of two events", () => {
      expect(calculateCombined(0.5, 0.5)).toBe(0.25);
      expect(calculateCombined(0.3, 0.7)).toBe(0.21);
      expect(calculateCombined(0, 0.5)).toBe(0);
      expect(calculateCombined(1, 1)).toBe(1);
    });
  });

  describe("calculateEither", () => {
    it("calculates the probability of either event occurring", () => {
      expect(calculateEither(0.5, 0.5)).toBe(0.75);
      expect(calculateEither(0.3, 0.7)).toBe(0.79);
      expect(calculateEither(0, 0.5)).toBe(0.5);
      expect(calculateEither(1, 1)).toBe(1);
    });
  });

  describe("calculateProbability", () => {
    it("returns the correct calculation based on operation type", () => {
      expect(calculateProbability(0.5, 0.5, "combinedWith")).toBe(0.25);
      expect(calculateProbability(0.5, 0.5, "either")).toBe(0.75);
    });
  });
});
