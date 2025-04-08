export type LogEntry = {
  date: string;
  operation: string;
  probabilityA: number;
  probabilityB: number;
  result: number;
};

export type CalculationOperation = "combinedWith" | "either";
