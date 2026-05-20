import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const NameField = () => {
  const form = useFormContext<ICustomerInfoDto>();
  return (
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Your Name</FieldLabel>
          <Input {...field} placeholder="Your Name" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default NameField;
