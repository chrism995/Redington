"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateProbabilityAction } from "@/app/calculator/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCalculatorStore } from "@/lib/zustand/store";
import { getAvailableOperations } from "@/lib/calculations";

// Form validation schema
const formSchema = z.object({
  probabilityA: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 1;
    },
    { message: "Probability must be between 0 and 1" }
  ),
  probabilityB: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 1;
    },
    { message: "Probability must be between 0 and 1" }
  ),
  operation: z.enum(["combinedWith", "either"]),
});

type FormValues = z.infer<typeof formSchema>;

export function CalculatorForm() {
  const [isCalculating, setIsCalculating] = useState(false);
  const { setResult, setError, addLog } = useCalculatorStore();
  const operations = getAvailableOperations();

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      probabilityA: "",
      probabilityB: "",
      operation: "combinedWith",
    },
  });

  // Watch the operation value to use for the RadioGroup
  const operationValue = watch("operation");

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsCalculating(true);
    setError(null);

    // Create FormData for server action
    const formData = new FormData();
    formData.append("probabilityA", data.probabilityA);
    formData.append("probabilityB", data.probabilityB);
    formData.append("operation", data.operation);

    try {
      // Applying defense in depth principle by validating the form data again on the server side
      const response = await calculateProbabilityAction(formData);

      if (response.error) {
        setError(response.error);
        setResult(null);
      } else {
        setResult(response.result ?? null);
        if (response.logEntry) {
          addLog(response.logEntry);
        }
      }
    } catch (err) {
      setError("An error occurred during calculation");
      console.error(err);
      console.error("Error during calculation:", err);
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="probabilityA">Probability A</Label>
          <Input
            id="probabilityA"
            type="number"
            step="0.01"
            min="0"
            max="1"
            placeholder="Enter a value between 0 and 1"
            {...register("probabilityA")}
            className={cn(errors.probabilityA && "border-red-500")}
          />
          {errors.probabilityA && (
            <p className="text-sm text-red-500">
              {errors.probabilityA.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="probabilityB">Probability B</Label>
          <Input
            id="probabilityB"
            type="number"
            step="0.01"
            min="0"
            max="1"
            placeholder="Enter a value between 0 and 1"
            {...register("probabilityB")}
            className={cn(errors.probabilityB && "border-red-500")}
          />
          {errors.probabilityB && (
            <p className="text-sm text-red-500">
              {errors.probabilityB.message}
            </p>
          )}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Label>Operation</Label>
          <RadioGroup
            value={operationValue}
            onValueChange={(value) => {
              // Use this approach to manually update the form value
              const event = {
                target: {
                  name: "operation",
                  value,
                },
              };
              register("operation").onChange(event);
            }}
            className="flex flex-col space-y-2"
          >
            {operations.map((op) => (
              <div key={op.id} className="flex items-center space-x-2">
                <RadioGroupItem value={op.id} id={op.id} />
                <Label htmlFor={op.id} className="cursor-pointer">
                  {op.name}
                  <span className="text-xs text-muted-foreground ml-2">
                    {op.formula}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <input type="hidden" {...register("operation")} />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isCalculating}>
        {isCalculating ? "Calculating..." : "Calculate"}
      </Button>
    </form>
  );
}
