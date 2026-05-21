"use client";

import { FieldSet } from "@/components/ui/field";
import { FormProvider, UseFormReturn } from "react-hook-form";

import NameField from "./name/NameField";
import PhoneField from "./phone/PhoneField";
import EmailField from "./email/EmailField";
import { Button } from "@/components/ui/button";
import { ICustomerInfoDto } from "@repo/shared";
import ShippingFields from "./shipping-fields/ShippingFields";

interface Props {
  form: UseFormReturn<ICustomerInfoDto>;
  onSubmit: (values: ICustomerInfoDto) => void;
  onReset: () => void;
  isPending?: boolean;
}

const CheckoutCustomerInfoForm = ({
  form,
  onSubmit,
  isPending,
  onReset,
}: Props) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet disabled={isPending}>
          <NameField />
          <EmailField />
          <PhoneField />
          <ShippingFields />
          <Button type="submit">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
          <Button type="reset" onClick={onReset}>
            Reset
          </Button>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default CheckoutCustomerInfoForm;
