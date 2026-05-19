import { useUpdateProduct } from "@/features/products/hooks/mutations/useUpdateProduct";
import EditProductForm from "@/forms/product/edit/EditProductForm";
import { frontendUrls } from "@/lib/frontendUrls";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IMyProduct,
  IUpdateProductDto,
  updateProductSchema,
} from "@repo/shared";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  product: IMyProduct;
}

const EditProductComponent = ({ product }: Props) => {
  const { mutate, isPending } = useUpdateProduct();
  const router = useRouter();

  const form = useForm<IUpdateProductDto>({
    resolver: zodResolver(updateProductSchema),
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

  const handleUpdate = async (dto: IUpdateProductDto) => {
    mutate(
      { dto, productId: product.id },
      {
        onSuccess: (_, { productId }) => {
          toast.success("Product edited successfully");
          router.push(frontendUrls.products.details(productId));
        },
        onError: (e) => {
          const msg = e.response?.data.message ?? "Something went wrong";
          toast.error(msg);
        },
      },
    );
  };
  return (
    <EditProductForm
      onReset={onReset}
      form={form}
      onSubmit={handleUpdate}
      isPending={isPending}
      initialData={product}
    />
  );
};

export default EditProductComponent;
