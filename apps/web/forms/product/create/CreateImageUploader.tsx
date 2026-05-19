"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { uploadSingleImage } from "@/lib/upload.image";
import { ICreateProductDto } from "@repo/shared";

const CreateImageUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const { watch, setValue } = useFormContext<ICreateProductDto>();

  const images = watch("images") ?? [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      setIsUploading(true);

      const uploadedImages = await Promise.all(
        Array.from(e.target.files).map((file) => uploadSingleImage(file)),
      );

      setValue("images", [...images, ...uploadedImages], {
        shouldValidate: true,
      });
    } finally {
      setIsUploading(false);
    }

    e.target.value = "";
  };

  const handleRemove = (key: string) => {
    setValue(
      "images",
      images.filter((img) => img.key !== key),
      {
        shouldValidate: true,
      },
    );
  };

  return (
    <div className="space-y-4">
      <input
        hidden
        multiple
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleUpload}
      />

      <Button
        type="button"
        disabled={isUploading || images.length >= 10}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? "Uploading..." : "Upload images"}
      </Button>

      {!!images.length && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.key}
              className="relative aspect-square overflow-hidden rounded-md border"
            >
              <Image
                fill
                src={image.url}
                alt="Product image"
                className="object-cover"
              />

              <Button
                size="icon"
                type="button"
                variant="destructive"
                className="absolute top-1 right-1 h-7 w-7"
                onClick={() => handleRemove(image.key)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateImageUploader;
