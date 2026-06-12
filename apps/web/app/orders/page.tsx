import React from "react";
import Orders from "./_components/Orders";
import PageHeader from "@/components/general/PageHeader";

const OrdersPage = () => {
  return (
    <main>
      <PageHeader
        title="Orders"
        description="View and track your previous purchases."
      />
      <Orders />
    </main>
  );
};

export default OrdersPage;
