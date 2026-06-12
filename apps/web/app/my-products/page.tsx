import Loader from "@/components/general/Loader";
import { Suspense } from "react";
import MyProducts from "./_components/MyProducts";
import PageHeader from "@/components/general/PageHeader";

const MyProductsPage = () => {
  return (
    <main>
      <PageHeader
        title="My Products"
        description="Manage the products you’ve listed for sale."
      />
      <Suspense fallback={<Loader />}>
        <MyProducts />
      </Suspense>
    </main>
  );
};

export default MyProductsPage;
