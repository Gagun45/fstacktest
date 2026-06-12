"use client";

import { IExistingImage } from "@repo/shared";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images: IExistingImage[];
  title: string;
}

const ProductImages = ({ images, title }: Props) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border">
        <Image src={active.url} alt={title} fill className="object-cover" />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className={`relative size-16 shrink-0 overflow-hidden rounded-md border ${
              active.id === img.id ? "ring-2 ring-black" : ""
            }`}
          >
            <Image src={img.url} alt={title} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
