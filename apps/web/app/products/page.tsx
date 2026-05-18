import Loader from "@/components/general/Loader";
import { Suspense } from "react";
import Dashboard from "./_components/Dashboard";

const ProductsPage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
