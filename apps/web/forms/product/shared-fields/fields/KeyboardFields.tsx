import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICreateProductDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const KeyboardFields = () => {
  const { control } = useFormContext<ICreateProductDto>();
  return (
    <>
      <Controller
        name="layout"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Layout</FieldLabel>
            <Input {...field} placeholder="Layout" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="caseMaterial"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Case material</FieldLabel>
            <Input {...field} placeholder="Case material" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="isHotswap"
        control={control}
        render={({ field: { value, onChange, ...field }, fieldState }) => (
          <Field>
            <FieldLabel>Is hot swap</FieldLabel>
            <Input
              type="checkbox"
              {...field}
              // Checkboxes use 'checked' instead of 'value'
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default KeyboardFields;
