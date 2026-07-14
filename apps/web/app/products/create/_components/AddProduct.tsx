"use client";

import { useCreateProduct } from "@/features/products/hooks/mutations/useCreateProduct";
import CreateProductForm from "@/forms/product/create/CreateProductForm";
import { frontendUrls } from "@/lib/frontendUrls";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateProductDto, productSchema } from "@repo/shared";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const { mutate, isPending } = useCreateProduct();
  const router = useRouter();
  const form = useForm<ICreateProductDto>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
      isHotswap: false,
      title: "",
      description: "",
      actuationForce: 0,
      brand: "",
      caseMaterial: "",
      layout: "",
      material: "",
      price: 0,
      profile: "",
      isInStock: false,
      switchType: "",
    },
  });

  const onReset = () => {
    form.reset();
  };

  const handleSubmit = async (dto: ICreateProductDto) => {
    mutate(dto, {
      onSuccess: ({ data: product }) => {
        toast.success("Product created");
        router.push(frontendUrls.products.details(product.id));
      },
      onError: (e) => {
        const msg = e.response?.data.message ?? "Something went wrong";
        toast.error(msg);
      },
    });
  };
  return (
    <CreateProductForm
      onReset={onReset}
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};

export default AddProduct;
