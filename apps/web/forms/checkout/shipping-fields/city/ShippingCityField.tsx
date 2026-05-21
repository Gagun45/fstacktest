import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const ShippingCityField = () => {
  const form = useFormContext<ICustomerInfoDto>();
  return (
    <Controller
      name="shippingCity"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>City</FieldLabel>
          <Input {...field} placeholder="City" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ShippingCityField;
