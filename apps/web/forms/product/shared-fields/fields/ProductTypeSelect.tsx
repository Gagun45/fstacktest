import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { ICreateProductDto } from "@repo/shared";

interface Props {
  disabled: boolean;
}

export const ProductTypeSelect = ({ disabled }: Props) => {
  const { control } = useFormContext<ICreateProductDto>();

  return (
    <Controller
      name="type"
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Product type</FieldLabel>

          <Select
            value={field.value ?? ""}
            onValueChange={(value) => field.onChange(value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="KEYBOARD">Keyboard</SelectItem>
              <SelectItem value="SWITCHES">Switches</SelectItem>
              <SelectItem value="KEYCAPS">Keycaps</SelectItem>
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
