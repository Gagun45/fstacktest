"use client";

import Loader from "@/components/general/Loader";
import { useMyProduct } from "@/features/products/hooks/queries/use-my-product";
import EditProductComponent from "./form/EditProductComponent";

interface Props {
  id: number;
}

const EditProduct = ({ id }: Props) => {
  const { data: product, isLoading } = useMyProduct(id);

  if (isLoading) return <Loader />;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>Product - {product.title}</h2>
      <EditProductComponent product={product} />
    </div>
  );
};

export default EditProduct;
