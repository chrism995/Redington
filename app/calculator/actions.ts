"use server";

import { validateAndParseFormData } from "@/lib/validation";
import { calculateProbability } from "@/lib/calculations";
import { logCalculation } from "@/lib/logger";
import { LogEntry } from "@/lib/types";

/// Backend action to handle server side validation and probability calculation
export async function calculateProbabilityAction(formData: FormData) {
  // Extract form data
  const rawData = {
    probabilityA: formData.get("probabilityA") as string,
    probabilityB: formData.get("probabilityB") as string,
    operation: formData.get("operation") as string,
  };

  // Validate and parse
  const validation = validateAndParseFormData(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  // Calculate
  const result = calculateProbability(
    validation.data.probabilityA,
    validation.data.probabilityB,
    validation.data.operation
  );

  // Create log entry
  const logEntry: LogEntry = {
    date: new Date().toISOString(),
    operation: validation.data.operation,
    probabilityA: validation.data.probabilityA,
    probabilityB: validation.data.probabilityB,
    result,
  };

  // Log calculation
  await logCalculation(logEntry);

  return {
    success: true,
    result,
    logEntry, // Return the log entry so client can update store
  };
}
