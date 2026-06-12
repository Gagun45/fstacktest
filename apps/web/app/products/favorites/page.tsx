import React from "react";
import FavoriteProducts from "./_components/FavoriteProducts";
import PageHeader from "@/components/general/PageHeader";

const FavoritesPage = () => {
  return (
    <main>
      <PageHeader
        title="Favorite Products"
        description="Products you saved for later"
      />

      <FavoriteProducts />
    </main>
  );
};

export default FavoritesPage;
