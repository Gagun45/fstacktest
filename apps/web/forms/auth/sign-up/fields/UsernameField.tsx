import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignUpDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const SignUpUsernameField = () => {
  const form = useFormContext<SignUpDto>();
  return (
    <Controller
      name="username"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <Input {...field} id={field.name} placeholder="Username" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default SignUpUsernameField;
