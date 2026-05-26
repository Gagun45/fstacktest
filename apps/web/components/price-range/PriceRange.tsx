"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  maxPrice: number;
  minPrice: number;
  onChange: (value: { minPrice: number; maxPrice: number }) => void;
}

const MIN = 0;
const MAX = 15000;

const PriceRange = ({
  minPrice: initialMin,
  maxPrice: initialMax,
  onChange,
}: Props) => {
  // 1. Maintain local state so the UI (slider/inputs) updates instantly and smoothly
  const [localMin, setLocalMin] = useState(initialMin);
  const [localMax, setLocalMax] = useState(initialMax);

  // Keep track of the props we used for the last render pass
  const [prevMin, setPrevMin] = useState(initialMin);
  const [prevMax, setPrevMax] = useState(initialMax);

  // Check if the parent props actually changed
  if (initialMin !== prevMin || initialMax !== prevMax) {
    setPrevMin(initialMin);
    setPrevMax(initialMax);
    setLocalMin(initialMin);
    setLocalMax(initialMax);
  }

  // 2. Debounce the external onChange callback (e.g., delay by 500ms)
  const debouncedOnChange = useDebouncedCallback(
    (value: { minPrice: number; maxPrice: number }) => {
      onChange(value);
    },
    500,
  );

  const handleSliderChange = (value: number[]) => {
    const newMin = value[0];
    const newMax = value[1];

    setLocalMin(newMin);
    setLocalMax(newMax);
    debouncedOnChange({ minPrice: newMin, maxPrice: newMax });
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    // Enforce: Must not be less than MIN (0), and must not exceed the current max price
    const validatedMin = Math.max(MIN, Math.min(value, localMax));

    setLocalMin(validatedMin);
    debouncedOnChange({ minPrice: validatedMin, maxPrice: localMax });
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    // Enforce: Must not exceed MAX (15000), and must not be lower than the current min price
    const validatedMax = Math.min(MAX, Math.max(value, localMin));

    setLocalMax(validatedMax);
    debouncedOnChange({ minPrice: localMin, maxPrice: validatedMax });
  };

  return (
    <div className="space-y-5 rounded-2xl border p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>

          <span className="text-sm text-muted-foreground">
            ${localMin} - ${localMax}
          </span>
        </div>

        <Slider
          value={[localMin, localMax]}
          min={MIN}
          max={MAX}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={handleSliderChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="min-price">Min</Label>

          <Input
            id="min-price"
            type="number"
            value={localMin}
            min={MIN}
            max={localMax}
            onChange={handleMinInput}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-price">Max</Label>

          <Input
            id="max-price"
            type="number"
            value={localMax}
            min={localMin}
            max={MAX}
            onChange={handleMaxInput}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
