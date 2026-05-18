"use client";

import Loader from "@/components/general/Loader";
import { useProductDetails } from "@/features/products/hooks/queries/use-prod-details";

interface Props {
  id: number;
}

const ProductDetails = ({ id }: Props) => {
  const { data: product, isLoading } = useProductDetails(id);
  if (isLoading) return <Loader />;
  if (!product) return <p>Failed to load data</p>;
  return (
    <div>
      <h1>Product details page</h1>
      <h2>Title: {product.title}</h2>
      <p>Seller: {product.seller.username}</p>
      {/* <ProductReviews id={id} />
      <NewReview productId={product.id} /> */}
    </div>
  );
};

export default ProductDetails;
