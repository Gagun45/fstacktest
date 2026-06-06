"use client";

import Loader from "@/components/general/Loader";
import { useMyProducts } from "@/features/products/hooks/queries/use-my-products";
import MyProductsList from "./list/MyProductsList";
import SelectComponent from "@/components/sorting/SelectComponent";
import { ISortValue, PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import { IProductSortOption } from "@repo/shared";
import { useProductsQuery } from "@/features/products/lib/use-products-query";
import Pagination from "@/components/pagination/Pagination";

const MyProducts = () => {
  const { query, setSorting, setPage } = useProductsQuery();
  const sortValue: ISortValue<IProductSortOption> = `${query.sortBy}-${query.order}`;
  const { data, isLoading } = useMyProducts(query);
  if (isLoading) return <Loader />;
  if (!data) return <p>Failed to load data</p>;
  const { data: myProducts, pagination } = data;
  const { hasNext, hasPrev, page, totalPages } = pagination;
  return (
    <div>
      <SelectComponent
        options={PRODUCT_SORT_OPTIONS}
        value={sortValue}
        onChange={setSorting}
      />
      <MyProductsList products={myProducts} />
      <Pagination
        hasNext={hasNext}
        hasPrev={hasPrev}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MyProducts;
