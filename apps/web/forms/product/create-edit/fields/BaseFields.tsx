import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICreateProductDto } from "@repo/shared";
import React from "react";
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
        name="stock"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Stock</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="Stock"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="lowStockThreshold"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Low stock threshold</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="Low stock threshold"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default BaseFields;
