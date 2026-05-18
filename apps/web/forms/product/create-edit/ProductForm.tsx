"use client";

import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { FormProvider, UseFormReturn } from "react-hook-form";

import BaseFields from "./fields/BaseFields";
import KeyboardFields from "./fields/KeyboardFields";
import KeycapFields from "./fields/KeycapsFields";
import SwitchFields from "./fields/SwitchesFields";
import { ProductTypeSelect } from "./fields/ProductTypeSelect";
import { ICreateProductDto } from "@repo/shared";

interface Props {
  form: UseFormReturn<ICreateProductDto>;
  onSubmit: (data: ICreateProductDto) => Promise<void>;
  isPending?: boolean;
  onReset: () => void;
  isEdit: boolean;
}

const ProductForm = ({ form, onSubmit, isPending, isEdit, onReset }: Props) => {
  const productType = form.watch("type");
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet disabled={isPending}>
          <BaseFields />
          <ProductTypeSelect disabled={isEdit} />
          {productType === "KEYBOARD" && <KeyboardFields />}
          {productType === "SWITCHES" && <SwitchFields />}
          {productType === "KEYCAPS" && <KeycapFields />}
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

export default ProductForm;
