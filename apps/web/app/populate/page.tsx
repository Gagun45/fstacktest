"use client";

import { Button } from "@/components/ui/button";
import { useCreateProduct } from "@/features/products/hooks/mutations/useCreateProduct";
import { ICreateProductDto } from "@repo/shared";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const generateMockProducts = () => {
  const products: ICreateProductDto[] = [];

  // 1. KEYBOARDS (15)
  for (let i = 1; i <= 15; i++) {
    products.push({
      type: "KEYBOARD",
      title: `Keyboard Model ${String.fromCharCode(64 + i)}`,
      description:
        "A premium mechanical keyboard with customizable RGB and high-quality build materials.",
      price: Math.floor(Math.random() * 200) + 50,
      isInStock: Math.random() < 0.5,
      layout: ["60%", "65%", "75%", "TKL", "Full-size"][
        Math.floor(Math.random() * 5)
      ],
      caseMaterial: ["Aluminum", "Polycarbonate", "Acrylic", "Wood"][
        Math.floor(Math.random() * 4)
      ],
      isHotswap: Math.random() > 0.3,
      images: [],
    });
  }

  // 2. SWITCHES (15)
  for (let i = 1; i <= 15; i++) {
    products.push({
      type: "SWITCHES",
      title: `Switch Set ${i}`,
      description:
        "High-performance mechanical switches designed for both gaming and heavy typing sessions.",
      price: Math.floor(Math.random() * 40) + 15,
      isInStock: Math.random() < 0.5,
      switchType: ["Linear", "Tactile", "Clicky"][
        Math.floor(Math.random() * 3)
      ],
      actuationForce: [45, 50, 55, 62, 67][Math.floor(Math.random() * 5)],
      brand: ["Gateron", "Cherry", "Kailh", "Durock", "JWK"][
        Math.floor(Math.random() * 5)
      ],
      images: [],
    });
  }

  // 3. KEYCAPS (15)
  for (let i = 1; i <= 15; i++) {
    products.push({
      type: "KEYCAPS",
      title: `Keycap Set ${String.fromCharCode(70 + i)}`,
      description:
        "Durable keycaps with crisp legends and a vibrant color palette to match your desk setup.",
      price: Math.floor(Math.random() * 100) + 30,
      isInStock: Math.random() < 0.5,
      profile: ["Cherry", "OEM", "XDA", "DSA", "SA", "MT3"][
        Math.floor(Math.random() * 6)
      ],
      material: ["PBT", "ABS"][Math.floor(Math.random() * 2)],
      images: [],
    });
  }

  // Shuffle the array so they aren't grouped by type
  return products.sort(() => Math.random() - 0.5);
};

const TestPage = () => {
  const mockProductData = generateMockProducts();
  const { mutateAsync } = useCreateProduct();
  const router = useRouter();

  const handleSeed = async () => {
    try {
      for (const dto of mockProductData) {
        await mutateAsync(dto);
      }

      toast.success("Seed success");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <Button onClick={handleSeed}>Seed products</Button>
    </div>
  );
};

export default TestPage;
