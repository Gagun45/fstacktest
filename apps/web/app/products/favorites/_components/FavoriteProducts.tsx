"use client";

import Loader from "@/components/general/Loader";
import { useGetFavorites } from "@/features/products/hooks/queries/use-get-favorites";
import FavoriteProductsList from "./list/FavoriteProductsList";

const FavoriteProducts = () => {
  const { data: products, isLoading } = useGetFavorites();
  if (isLoading) return <Loader />;
  if (!products) return <p>Failed to load data</p>;
  if (products.length === 0) return <p>No products yet</p>;
  return (
    <>
      <FavoriteProductsList products={products} />
    </>
  );
};

export default FavoriteProducts;
