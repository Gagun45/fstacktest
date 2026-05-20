import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const AdditionalInfoField = () => {
  const form = useFormContext<ICustomerInfoDto>();
  return (
    <Controller
      name="additionalInfo"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Additional info (optional)</FieldLabel>
          <Textarea {...field} placeholder="Additional info" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default AdditionalInfoField;
