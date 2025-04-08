"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCalculationLogs } from "@/lib/hooks/useCalculationLogs";

export function CalculationLog() {
  const { logs, isLoading, error } = useCalculationLogs();

  return (
    <div>
      {error && (
        <div className="py-4 text-center text-destructive">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            Loading calculation history...
          </p>
        </div>
      ) : logs.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            No calculations performed yet.
          </p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="max-h-[350px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Prob A</TableHead>
                  <TableHead>Prob B</TableHead>
                  <TableHead className="text-right">Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(log.date).toLocaleString(undefined, {
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      {log.operation === "combinedWith"
                        ? "Combined With"
                        : "Either"}
                    </TableCell>
                    <TableCell>{log.probabilityA}</TableCell>
                    <TableCell>{log.probabilityB}</TableCell>
                    <TableCell className="text-right font-medium">
                      {log.result.toFixed(4)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
