// ShippingAddress1Field.tsx

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";

import { Controller, useFormContext } from "react-hook-form";

const ShippingAddress1Field = () => {
  const form = useFormContext<ICustomerInfoDto>();

  return (
    <Controller
      name="shippingAddress1"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Address</FieldLabel>

          <Input {...field} placeholder="Street, house, apartment" />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ShippingAddress1Field;
