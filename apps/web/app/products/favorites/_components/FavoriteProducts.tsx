"use client";

import Loader from "@/components/general/Loader";
import { useGetFavorites } from "@/features/products/hooks/queries/use-get-favorites";
import FavoriteProductsList from "./list/FavoriteProductsList";
import StateScreen from "@/components/general/StateScreen";

const FavoriteProducts = () => {
  const { data: products, isLoading, isError } = useGetFavorites();
  if (isLoading) return <Loader />;
  if (isError || !products) {
    return (
      <StateScreen
        title="Couldn't load your favorite products"
        description="Please try again in a moment."
      />
    );
  }

  if (products.length === 0) {
    return (
      <StateScreen
        title="No favorite products yet"
        description="Save products you like to easily find them here later."
      />
    );
  }
  return <FavoriteProductsList products={products} />;
};

export default FavoriteProducts;
