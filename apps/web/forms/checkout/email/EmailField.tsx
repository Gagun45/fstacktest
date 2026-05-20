import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const EmailField = () => {
  const form = useFormContext<ICustomerInfoDto>();
  return (
    <Controller
      name="email"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input {...field} placeholder="Email" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default EmailField;
