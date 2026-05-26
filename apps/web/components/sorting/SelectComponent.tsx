import { ISelectOption } from "@/types/sort.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  value: string;
  options: ISelectOption[];
  onChange: (value: string) => void;
}

const SelectComponent = ({ options, onChange, value }: Props) => {
  const selectedValue = options.find((v) => v.value === value)?.value;
  return (
    <Select value={selectedValue} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.label} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
