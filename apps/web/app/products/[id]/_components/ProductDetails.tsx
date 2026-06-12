"use client";

import Loader from "@/components/general/Loader";
import { Button } from "@/components/ui/button";
import { useProductDetails } from "@/features/products/hooks/queries/use-product-details";
import ProductActions from "./actions/ProductActions";
import ProductDescription from "./description/ProductDescription";
import ProductImages from "./images/ProductImages";
import ProductReviews from "./reviews/ProductReviews";
import ProductSpecs from "./specs/ProductSpecs";
import ProductReviewSummary from "./summary/ProductReviewSummary";
import AddToCartButton from "./add-to-cart-btn/AddToCartButton";

interface Props {
  id: number;
}

const ProductDetails = ({ id }: Props) => {
  const { data: product, isLoading } = useProductDetails(id);
  if (isLoading) return <Loader />;
  if (!product) return <p>Failed to load data</p>;
  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col gap-4 xl:hidden pb-12 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        <ProductImages images={product.images} title={product.title} />

        <p className="text-sm text-muted-foreground">
          Sold by {product.seller.username}
        </p>
        <ProductActions product={product} />

        <ProductDescription description={product.description} />

        <ProductSpecs product={product} />

        <ProductReviewSummary product={product} />

        <ProductReviews productId={id} />

        <AddToCartButton product={product} />
      </div>

      {/* DESKTOP */}
      <div className="hidden xl:flex gap-8 pb-12 w-full">
        <div className="flex flex-1 flex-col gap-4">
          <ProductImages images={product.images} title={product.title} />
          <ProductDescription description={product.description} />
          <ProductSpecs product={product} />
          <ProductReviews productId={id} />
        </div>

        <div className="flex flex-1 flex-col gap-4 sticky top-36 self-start">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <ProductActions product={product} />
          <ProductReviewSummary product={product} />
          <p className="text-sm text-muted-foreground">
            Sold by {product.seller.username}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
