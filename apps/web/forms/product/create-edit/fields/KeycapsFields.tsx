import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICreateProductDto } from "@repo/shared";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const KeycapFields = () => {
  const { control } = useFormContext<ICreateProductDto>();

  return (
    <>
      <Controller
        name="profile"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Profile</FieldLabel>
            <Input {...field} placeholder="e.g. Cherry, OEM, XDA" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="material"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Material</FieldLabel>
            <Input {...field} placeholder="e.g. PBT, ABS" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default KeycapFields;
