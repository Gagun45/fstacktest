import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ISignInDto } from "@repo/shared";

import { Controller, useFormContext } from "react-hook-form";

const SignInEmailField = () => {
  const form = useFormContext<ISignInDto>();
  return (
    <Controller
      name="email"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <Input {...field} id={field.name} placeholder="Email" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default SignInEmailField;
