// ShippingNoteField.tsx

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const ShippingNoteField = () => {
  const form = useFormContext<ICustomerInfoDto>();

  return (
    <Controller
      name="shippingNote"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Delivery note</FieldLabel>

          <Textarea {...field} placeholder="Additional delivery instructions" />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ShippingNoteField;
