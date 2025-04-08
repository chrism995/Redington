import { z } from "zod";

/**
 * Schema for calculator form data - validates and transforms in one step
 */
export const calculatorFormSchema = z.object({
  probabilityA: z
    .string()
    .trim()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .transform((val) => {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    })
    .refine(
      (val) => val >= 0 && val <= 1,
      "Probability must be between 0 and 1"
    ),

  probabilityB: z
    .string()
    .trim()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .transform((val) => {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    })
    .refine(
      (val) => val >= 0 && val <= 1,
      "Probability must be between 0 and 1"
    ),

  operation: z
    .enum(["combinedWith", "either"] as const)
    .refine(
      (val) => ["combinedWith", "either"].includes(val),
      "Operation must be either 'combinedWith' or 'either'"
    ),
});

/**
 * Type for form data after validation and transformation
 */
export type ValidatedFormData = z.infer<typeof calculatorFormSchema>;

/**
 * Validates and transforms form input data into usable calculation parameters
 *
 * @param formData Raw form data from user input
 * @returns Object with success status and either validated data or error message
 */
export function validateAndParseFormData(
  formData: Record<string, string>
):
  | { success: true; data: ValidatedFormData }
  | { success: false; error: string } {
  try {
    // Validate and transform in one step
    const result = calculatorFormSchema.safeParse(formData);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // Extract the first error message for user-friendly feedback
      const errorMessages = result.error.errors.map((err) => err.message);
      return {
        success: false,
        error: errorMessages[0] || "Invalid input values",
      };
    }
  } catch {
    return {
      success: false,
      error: "An error occurred while validating input data.",
    };
  }
}
