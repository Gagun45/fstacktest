"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  minPrice: number;
  maxPrice: number;
  onChange: (value: { minPrice: number; maxPrice: number }) => void;
}

const MIN = 0;
const MAX = 15000;

const PriceRange = ({ minPrice, maxPrice, onChange }: Props) => {
  const handleSliderChange = (value: number[]) => {
    onChange({
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    onChange({
      minPrice: Math.min(value, maxPrice),
      maxPrice,
    });
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    onChange({
      minPrice,
      maxPrice: Math.max(value, minPrice),
    });
  };

  return (
    <div className="space-y-5 rounded-2xl border p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>

          <span className="text-sm text-muted-foreground">
            ${minPrice} - ${maxPrice}
          </span>
        </div>

        <Slider
          value={[minPrice, maxPrice]}
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
            value={minPrice}
            min={MIN}
            max={maxPrice}
            onChange={handleMinInput}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-price">Max</Label>

          <Input
            id="max-price"
            type="number"
            value={maxPrice}
            min={minPrice}
            max={MAX}
            onChange={handleMaxInput}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
