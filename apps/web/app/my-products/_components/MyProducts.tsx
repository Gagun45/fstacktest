"use client";

import Loader from "@/components/general/Loader";
import { useMyProducts } from "@/features/products/hooks/queries/use-my-products";
import MyProductsList from "./list/MyProductsList";
import SelectComponent from "@/components/sorting/SelectComponent";
import { ISortValue, PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import { IProductSortOption } from "@repo/shared";
import { useProductsQuery } from "@/features/products/lib/use-products-query";
import Pagination from "@/components/pagination/Pagination";
import StateScreen from "@/components/general/StateScreen";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { frontendUrls } from "@/lib/frontendUrls";

const MyProducts = () => {
  const { query, setSorting, setPage } = useProductsQuery();
  const { sortBy, order } = query;
  const sortValue: ISortValue<IProductSortOption> = `${sortBy}-${order}`;
  const { data, isLoading, isError } = useMyProducts(query);
  if (isLoading) return <Loader />;
  if (isError || !data) {
    return (
      <StateScreen
        title="Couldn't load your products"
        description="Please try again in a moment."
      />
    );
  }
  const { data: myProducts, pagination } = data;
  if (myProducts.length === 0) {
    return (
      <StateScreen
        title="You haven't listed any products yet"
        description="Start by adding your first product to your store."
        action={
          <Button asChild>
            <Link href={frontendUrls.products.create}>Add product</Link>
          </Button>
        }
      />
    );
  }
  const { hasNext, hasPrev, page, totalPages } = pagination;
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex justify-end w-full">
        <SelectComponent
          options={PRODUCT_SORT_OPTIONS}
          value={sortValue}
          onChange={setSorting}
        />
      </div>
      <MyProductsList products={myProducts} />
      <div className="mt-4">
        <Pagination
          hasNext={hasNext}
          hasPrev={hasPrev}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default MyProducts;
