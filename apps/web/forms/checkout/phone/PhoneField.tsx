import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const PhoneField = () => {
  const form = useFormContext<ICustomerInfoDto>();
  return (
    <Controller
      name="phone"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Phone (optional)</FieldLabel>
          <Input {...field} type="tel" placeholder="Phone" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default PhoneField;
