import Loader from "@/components/general/Loader";
import { Suspense } from "react";
import MyProducts from "./_components/MyProducts";

const MyProductsPage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Suspense fallback={<Loader />}>
        <MyProducts />
      </Suspense>
    </div>
  );
};

export default MyProductsPage;
