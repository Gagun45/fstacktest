"use client";

import Loader from "@/components/general/Loader";
import { useMyProducts } from "@/features/products/hooks/queries/use-my-products";
import { useProductFilters } from "@/features/products/lib/use-prod-filters";
import MyProductsList from "./list/MyProductsList";

const MyProducts = () => {
  const { filters, setFilters } = useProductFilters();
  const { data, isLoading } = useMyProducts(filters);
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
