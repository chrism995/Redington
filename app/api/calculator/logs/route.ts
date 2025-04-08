import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const logDir = process.env.LOG_DIRECTORY || "logs";
    const logFilename =
      process.env.CALCULATION_LOG_FILENAME || "calculations.log";
    const logFile = path.join(process.cwd(), logDir, logFilename);

    try {
      // Check if the file exists
      await fs.access(logFile);
    } catch {
      // Return empty array if file doesn't exist
      return NextResponse.json([], { status: 200 });
    }

    // Read log file
    const logContent = await fs.readFile(logFile, "utf-8");

    // Parse log entries
    const logs = logContent
      .trim()
      .split("\n")
      .map((line) => {
        try {
          const dateMatch = line.match(/\[(.*?)\]/);
          const operationMatch = line.match(/Operation: (.*?),/);
          const inputsMatch = line.match(/Inputs: (.*?), (.*?),/);
          const resultMatch = line.match(/Result: (.*?)$/);

          if (dateMatch && operationMatch && inputsMatch && resultMatch) {
            return {
              date: dateMatch[1],
              operation: operationMatch[1],
              probabilityA: parseFloat(inputsMatch[1]),
              probabilityB: parseFloat(inputsMatch[2]),
              result: parseFloat(resultMatch[1]),
            };
          }
          return null;
        } catch (error) {
          console.error("Error parsing log line:", error);
          return null;
        }
      })
      .filter(Boolean)
      .reverse(); // Most recent first

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("Error reading logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
