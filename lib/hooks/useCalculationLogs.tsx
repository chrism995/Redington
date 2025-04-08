import { useState, useEffect, useCallback } from "react";
import { useCalculatorStore } from "@/lib/zustand/store";
import { LogEntry } from "@/lib/types";

/**
 * Custom hook that fetches calculation logs and adds them to the Zustand store
 *
 * @returns State and controls for calculation logs
 */
export function useCalculationLogs() {
  const { logs, setLogs } = useCalculatorStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calculator/logs");

      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }

      const logData: LogEntry[] = await response.json();
      setLogs(logData);
      return true;
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError(err instanceof Error ? err.message : "Failed to load logs");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setLogs]);

  // Fetch logs on initial mount
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    isLoading,
    error,
  };
}
