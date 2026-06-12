import { Suspense } from "react";
import Products from "./_components/Products";
import Loader from "@/components/general/Loader";

const ProductsPage = () => {
  return (
    <main>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Products</h1>

        <p className="text-muted-foreground">
          Browse our collection and find what you need.
        </p>
      </div>
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </main>
  );
};

export default ProductsPage;
