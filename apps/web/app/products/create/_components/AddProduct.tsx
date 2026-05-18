"use client";

import { useCreateProduct } from "@/features/products/hooks/mutations/useCreateProduct";
import ProductForm from "@/forms/product/create-edit/ProductForm";
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
      stock: 0,
      switchType: "",
      lowStockThreshold: 0,
    },
  });

  const onReset = () => {
    form.reset();
  };

  const handleSubmit = async (dto: ICreateProductDto) => {
    mutate(dto, {
      onSuccess: () => {
        form.reset();
        toast.success("Product created");
        router.push(frontendUrls.products.all);
      },
      onError: (e) => {
        const msg = e.response?.data.message ?? "Something went wrong";
        toast.error(msg);
      },
    });
  };
  return (
    <ProductForm
      isEdit={false}
      onReset={onReset}
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};

export default AddProduct;
