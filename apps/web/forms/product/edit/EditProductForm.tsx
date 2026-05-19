"use client";

import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { FormProvider, UseFormReturn } from "react-hook-form";

import { IMyProduct, IUpdateProductDto } from "@repo/shared";
import BaseFields from "../shared-fields/fields/BaseFields";
import KeyboardFields from "../shared-fields/fields/KeyboardFields";
import KeycapFields from "../shared-fields/fields/KeycapsFields";
import { ProductTypeSelect } from "../shared-fields/fields/ProductTypeSelect";
import SwitchFields from "../shared-fields/fields/SwitchesFields";
import EditImageUploader from "./EditImageUploader";
import ExistingImages from "./ExistingImages";

interface Props {
  form: UseFormReturn<IUpdateProductDto>;
  initialData: IMyProduct;
  onSubmit: (data: IUpdateProductDto) => Promise<void>;
  isPending?: boolean;
  onReset: () => void;
}

const EditProductForm = ({
  form,
  initialData,
  onSubmit,
  isPending,
  onReset,
}: Props) => {
  const productType = form.watch("type");
  const removeImageIds = form.watch("removeImageIds") ?? [];
  const { images } = initialData;
  const handleToggleExisting = (id: string) => {
    const isAlreadyMarked = removeImageIds.includes(id);

    const next = isAlreadyMarked
      ? removeImageIds.filter((x) => x !== id)
      : [...removeImageIds, id];

    form.setValue("removeImageIds", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet disabled={isPending}>
          <BaseFields />

          <ExistingImages
            removeImageIds={removeImageIds}
            images={images}
            onToggle={handleToggleExisting}
          />
          <EditImageUploader />

          {/* optional: lock type in edit */}
          <ProductTypeSelect disabled />

          {productType === "KEYBOARD" && <KeyboardFields />}

          {productType === "SWITCHES" && <SwitchFields />}

          {productType === "KEYCAPS" && <KeycapFields />}

          <div className="flex gap-3">
            <Button type="submit">
              {isPending ? "Saving..." : "Save changes"}
            </Button>

            <Button
              type="reset"
              variant="outline"
              onClick={() => {
                form.reset(initialData);
                onReset();
              }}
            >
              Reset
            </Button>
          </div>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
