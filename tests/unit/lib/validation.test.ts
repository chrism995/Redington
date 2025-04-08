import { validateAndParseFormData } from "@/lib/validation";

describe("Form Validation", () => {
  it("validates and transforms valid input data", () => {
    const validData = {
      probabilityA: "0.5",
      probabilityB: "0.7",
      operation: "combinedWith",
    };

    const result = validateAndParseFormData(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        probabilityA: 0.5,
        probabilityB: 0.7,
        operation: "combinedWith",
      });
    }
  });

  it("rejects probability values outside the valid range", () => {
    const invalidData = {
      probabilityA: "1.5",
      probabilityB: "0.7",
      operation: "combinedWith",
    };

    const result = validateAndParseFormData(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("between 0 and 1");
    }
  });

  it("rejects non-numeric probability values", () => {
    const invalidData = {
      probabilityA: "abc",
      probabilityB: "0.7",
      operation: "combinedWith",
    };

    const result = validateAndParseFormData(invalidData);

    expect(result.success).toBe(false);
  });

  it("rejects invalid operation values", () => {
    const invalidData = {
      probabilityA: "0.5",
      probabilityB: "0.7",
      operation: "invalid",
    };

    const result = validateAndParseFormData(
      invalidData as {
        probabilityA: string;
        probabilityB: string;
        operation: string;
      }
    );

    expect(result.success).toBe(false);
  });
});
