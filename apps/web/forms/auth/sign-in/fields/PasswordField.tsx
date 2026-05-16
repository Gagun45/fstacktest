import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignInDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const SignInPasswordField = () => {
  const form = useFormContext<SignInDto>();
  return (
    <Controller
      name="password"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <Input
            type="password"
            {...field}
            id={field.name}
            placeholder="Password"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default SignInPasswordField;
