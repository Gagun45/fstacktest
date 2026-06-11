import Loader from "@/components/general/Loader";
import { Suspense } from "react";
import MyProducts from "./_components/MyProducts";

const MyProductsPage = () => {
  return (
    <main>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">My Products</h1>

        <p className="text-muted-foreground">
          Manage the products you’ve listed for sale.
        </p>
      </div>
      <Suspense fallback={<Loader />}>
        <MyProducts />
      </Suspense>
    </main>
  );
};

export default MyProductsPage;
