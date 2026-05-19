import { Button } from "@/components/ui/button";
import { IExistingImage } from "@repo/shared";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  images: IExistingImage[];
  onToggle: (id: string) => void;
  removeImageIds: string[];
}

const ExistingImages = ({ images, onToggle, removeImageIds }: Props) => {
  return (
    <div className="flex flex-wrap gap-4    ">
      {images.map((img) => {
        const isMarkedForDeletion = removeImageIds.includes(img.id.toString());

        return (
          <div
            key={img.id}
            className="relative size-48 aspect-square overflow-hidden rounded-md border"
          >
            <Image
              fill
              src={img.url}
              alt="Product image"
              className={`object-cover transition ${
                isMarkedForDeletion ? "opacity-40 grayscale" : ""
              }`}
            />

            {/* overlay indicator */}
            {isMarkedForDeletion && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-medium">
                Will be removed
              </div>
            )}

            <Button
              type="button"
              size="icon"
              variant={isMarkedForDeletion ? "secondary" : "destructive"}
              className="absolute top-1 right-1 h-7 w-7"
              onClick={() => onToggle(img.id.toString())}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ExistingImages;
