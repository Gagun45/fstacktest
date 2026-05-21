import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { COUNTRIES, ICustomerInfoDto } from "@repo/shared";
import { Controller, useFormContext } from "react-hook-form";

const ShippingCountryField = () => {
  const form = useFormContext<ICustomerInfoDto>();
  return (
    <Controller
      name="shippingCountry"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Country</FieldLabel>
          <Combobox
            items={COUNTRIES}
            value={field.value}
            onValueChange={(v) => field.onChange(v ?? "")}
          >
            <ComboboxInput placeholder="Select a country" />
            <ComboboxContent>
              <ComboboxEmpty>Not found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ShippingCountryField;
