// ShippingAddress2Field.tsx

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const ShippingAddress2Field = () => {
  const form = useFormContext<ICustomerInfoDto>();

  return (
    <Controller
      name="shippingAddress2"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Address line 2</FieldLabel>

          <Input {...field} placeholder="Apartment, suite, etc. (optional)" />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ShippingAddress2Field;
