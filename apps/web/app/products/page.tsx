import { Suspense } from "react";
import Products from "./_components/Products";
import Loader from "@/components/general/Loader";
import PageHeader from "@/components/general/PageHeader";

const ProductsPage = () => {
  return (
    <main>
      <PageHeader
        title="Products"
        description="Browse our collection and find what you need."
      />
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </main>
  );
};

export default ProductsPage;
