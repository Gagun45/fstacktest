"use client";

import Loader from "@/components/general/Loader";
import { useProductDetails } from "@/features/products/hooks/queries/use-product-details";
import ProductActions from "./actions/ProductActions";
import AddToCartButton from "./add-to-cart-btn/AddToCartButton";
import ProductDescription from "./description/ProductDescription";
import ProductImages from "./images/ProductImages";
import ProductReviews from "./reviews/ProductReviews";
import ProductSpecs from "./specs/ProductSpecs";
import ProductReviewSummary from "./summary/ProductReviewSummary";
import StateScreen from "@/components/general/StateScreen";

interface Props {
  id: number;
}

const ProductDetails = ({ id }: Props) => {
  const { data: product, isLoading, isError } = useProductDetails(id);
  if (isLoading) return <Loader />;
  if (isError || !product) {
    return (
      <StateScreen
        title="Couldn't load this product"
        description="Please try again in a moment or return to the catalog."
      />
    );
  }
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

        <div className="flex flex-1 flex-col h-fit gap-4 sticky top-32 border p-4 rounded-md">
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
