"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IProductType, PRODUCT_TYPES } from "@repo/shared";

interface Props {
  value: IProductType[];
  onChange: (value: IProductType) => void;
}

const TypeFilter = ({ value, onChange }: Props) => {
  return (
    <Card className="p-4 space-y-3 rounded-2xl">
      <div className="font-medium">Categories</div>

      <div className="space-y-3">
        {PRODUCT_TYPES.map((type) => (
          <div key={type.value} className="flex items-center space-x-2">
            <Checkbox
              id={type.value}
              checked={value.includes(type.value)}
              onCheckedChange={() => onChange(type.value)}
            />
            <Label htmlFor={type.value} className="cursor-pointer">
              {type.label}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TypeFilter;
