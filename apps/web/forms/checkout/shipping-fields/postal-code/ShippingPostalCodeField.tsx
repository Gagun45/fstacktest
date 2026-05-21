// ShippingPostalCodeField.tsx

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const ShippingPostalCodeField = () => {
  const form = useFormContext<ICustomerInfoDto>();

  return (
    <Controller
      name="shippingPostalCode"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Postal code</FieldLabel>

          <Input {...field} placeholder="Postal code" />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ShippingPostalCodeField;
