"use client";

import { FieldSet } from "@/components/ui/field";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerInfoSchema, ICustomerInfoDto, IUser } from "@repo/shared";
import EmailField from "./email/EmailField";
import NameField from "./name/NameField";
import PhoneField from "./phone/PhoneField";
import ShippingFields from "./shipping-fields/ShippingFields";

interface Props {
  onSubmit: (values: ICustomerInfoDto) => void;
  isPending: boolean;
  user: IUser;
}

const CheckoutCustomerInfoForm = ({ onSubmit, isPending, user }: Props) => {
  const defaultValues: ICustomerInfoDto = {
    email: user.email,
    name: user.name,
    phone: user.phone,
    shippingAddress1: "",
    shippingCity: "",
    shippingCountry: "",
    shippingAddress2: "",
    shippingNote: "",
    shippingPostalCode: "",
  };
  const form = useForm<ICustomerInfoDto>({
    defaultValues,
    resolver: zodResolver(customerInfoSchema),
  });

  const onReset = () => {
    form.reset();
  };
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
