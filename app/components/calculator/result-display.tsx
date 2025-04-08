"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorStore } from "@/lib/zustand/store";

export function ResultDisplay() {
  const { result, error } = useCalculatorStore();

  if (!result && !error) {
    return null;
  }

  return (
    <div className="space-y-4 mt-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result !== null && (
        <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">
                Result
              </p>
              <p className="text-3xl font-bold">{result.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Calculated at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
