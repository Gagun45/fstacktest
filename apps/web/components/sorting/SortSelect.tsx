import { ISortOption } from "@/types/sort.types";
import { ISortOrder } from "@repo/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props<T extends string> {
  sortBy: T;
  order: ISortOrder;
  options: ISortOption<T>[];
  onChange: (optionLabel: string) => void;
}

const SortSelect = <T extends string>({
  options,
  onChange,
  sortBy,
  order,
}: Props<T>) => {
  const selectedValue = options.find(
    (opt) => opt.order === order && opt.sortBy === sortBy,
  )?.label;

  return (
    <Select value={selectedValue} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.label}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
