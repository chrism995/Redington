import { CalculationLog } from "./components/calculator/calculation-log";
import { CalculatorForm } from "./components/calculator/calculator-form";
import { ResultDisplay } from "./components/calculator/result-display";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Probability Calculator
          </h1>
        </header>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Left column with Calculator and Result */}
          <div className="flex flex-col h-full">
            <Card className="shadow-lg flex-grow">
              <CardContent className="pt-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Calculator</h2>
                <div className="flex-grow">
                  <CalculatorForm />
                </div>
                <div className="mt-4">
                  <ResultDisplay />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column with History */}
          <div className="flex flex-col h-full">
            <Card className="shadow-lg flex-grow">
              <CardContent className="pt-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">
                  Calculation History
                </h2>
                <div className="flex-grow">
                  <CalculationLog />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
