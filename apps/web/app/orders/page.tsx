import React from "react";
import Orders from "./_components/Orders";

const OrdersPage = () => {
  return (
    <main>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="text-muted-foreground">
          View and track your previous purchases.
        </p>
      </div>
      <Orders />
    </main>
  );
};

export default OrdersPage;
