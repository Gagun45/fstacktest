import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICreateProductDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const SwitchFields = () => {
  const { control } = useFormContext<ICreateProductDto>();

  return (
    <>
      <Controller
        name="brand"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Brand</FieldLabel>
            <Input {...field} placeholder="e.g. Gateron, Cherry" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="switchType"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Switch Type</FieldLabel>
            <Input {...field} placeholder="Linear, Tactile, Clicky" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="actuationForce"
        control={control}
        render={({ field: { onChange, ...field }, fieldState }) => (
          <Field>
            <FieldLabel>Actuation Force (g)</FieldLabel>
            <Input
              {...field}
              type="number"
              placeholder="e.g. 45"
              onChange={(e) => onChange(e.target.valueAsNumber || 0)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default SwitchFields;
