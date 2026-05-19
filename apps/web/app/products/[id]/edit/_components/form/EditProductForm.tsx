import { useUpdateProduct } from "@/features/products/hooks/mutations/useUpdateProduct";
import ProductForm from "@/forms/product/create-edit/ProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateProductDto, IMyProduct, productSchema } from "@repo/shared";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  product: IMyProduct;
}

const EditProductForm = ({ product }: Props) => {
  const { mutate, isPending } = useUpdateProduct();
  const router = useRouter();

  const form = useForm<ICreateProductDto>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      // 1. Spread base product fields (title, price, stock, description, type)
      ...product,

      // 2. Spread specific metadata based on the type
      ...(product.type === "KEYBOARD" && product.keyboard),
      ...(product.type === "SWITCHES" && product.switches),
      ...(product.type === "KEYCAPS" && product.keycaps),
    },
  });

  const onReset = () => {
    form.reset();
  };

  const handleUpdate = async (dto: ICreateProductDto) => {
    mutate(
      { dto, productId: product.id },
      {
        onSuccess: (_, { productId }) => {
          toast.success("Product edited successfully");
          router.push(`/products/${productId}`);
        },
        onError: (e) => {
          toast.error(e.response?.data.message ?? "qwe");
        },
      },
    );
  };
  return (
    <ProductForm
      onReset={onReset}
      form={form}
      onSubmit={handleUpdate}
      isEdit={true}
      isPending={isPending}
    />
  );
};

export default EditProductForm;
