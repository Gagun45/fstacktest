"use client";

import Loader from "@/components/general/Loader";
import { useMyProducts } from "@/features/products/hooks/queries/use-my-products";
import MyProductsList from "./list/MyProductsList";
import { useProductQuery } from "@/features/products/lib/use-product-query";

const MyProducts = () => {
  const { query } = useProductQuery();
  const { data, isLoading } = useMyProducts(query);
  if (isLoading) return <Loader />;
  if (!data) return <p>Failed to load data</p>;
  const { data: myProducts, pagination } = data;
  return (
    <div>
      <MyProductsList products={myProducts} />
    </div>
  );
};

export default MyProducts;
