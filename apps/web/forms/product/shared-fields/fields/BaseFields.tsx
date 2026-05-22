import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ICreateProductDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const BaseFields = () => {
  const { control } = useFormContext<ICreateProductDto>();
  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Title" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Input {...field} placeholder="Description" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Price</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="Price"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="isInStock"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <div className="flex items-center gap-3">
              <FieldLabel>Is in stock</FieldLabel>

              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default BaseFields;
