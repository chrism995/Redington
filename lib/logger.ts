import fs from "fs/promises";
import path from "path";
import { LogEntry } from "./types";

export async function logCalculation(logData: LogEntry) {
  const logDir = path.join(process.cwd(), "logs");
  const logFile = path.join(logDir, "calculations.log");

  try {
    // Ensure log directory exists
    await fs.mkdir(logDir, { recursive: true });

    const logEntry = `[${logData.date}] Operation: ${logData.operation}, Inputs: ${logData.probabilityA}, ${logData.probabilityB}, Result: ${logData.result}\n`;

    await fs.appendFile(logFile, logEntry);
  } catch (error) {
    console.error("Failed to log calculation:", error);
  }
}
