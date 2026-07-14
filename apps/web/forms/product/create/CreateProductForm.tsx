"use client";

import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useState } from "react";

import { ICreateProductDto } from "@repo/shared";
import BaseFields from "../shared-fields/fields/BaseFields";
import { ProductTypeSelect } from "../shared-fields/fields/ProductTypeSelect";
import KeyboardFields from "../shared-fields/fields/KeyboardFields";
import SwitchFields from "../shared-fields/fields/SwitchesFields";
import KeycapFields from "../shared-fields/fields/KeycapsFields";
import CreateImageUploader from "./CreateImageUploader";

interface Props {
  form: UseFormReturn<ICreateProductDto>;
  onSubmit: (data: ICreateProductDto) => Promise<void>;
  isPending?: boolean;
  onReset: () => void;
}

const CreateProductForm = ({ form, onSubmit, isPending, onReset }: Props) => {
  const productType = form.watch("type");
  const [isUploading, setIsUploading] = useState(false);
  const imageError = form.formState.errors.images;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet disabled={isPending}>
          <BaseFields />

          <CreateImageUploader onUploadingChange={setIsUploading} />
          {imageError && (
            <p className="text-sm text-destructive">{imageError.message}</p>
          )}

          <ProductTypeSelect disabled={false} />

          {productType === "KEYBOARD" && <KeyboardFields />}

          {productType === "SWITCHES" && <SwitchFields />}

          {productType === "KEYCAPS" && <KeycapFields />}

          <div className="flex gap-3">
            <Button type="submit" disabled={isUploading}>
              {isPending ? "Submitting..." : "Create product"}
            </Button>

            <Button
              type="reset"
              variant="outline"
              disabled={isUploading}
              onClick={onReset}
            >
              Reset
            </Button>
          </div>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default CreateProductForm;
