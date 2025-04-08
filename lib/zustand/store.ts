import { create } from "zustand";
import { LogEntry } from "../types";

type CalculatorState = {
  result: number | null;
  error: string | null;
  logs: LogEntry[];

  // Actions
  setResult: (result: number | null) => void;
  setError: (error: string | null) => void;
  setLogs: (logs: LogEntry[]) => void;
  addLog: (log: LogEntry) => void;
};

export const useCalculatorStore = create<CalculatorState>((set) => ({
  result: null,
  error: null,
  logs: [],

  setResult: (result) => set({ result }),
  setError: (error) => set({ error }),
  setLogs: (logs) => set({ logs }),
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs], // Add new log at the beginning
    })),
}));
