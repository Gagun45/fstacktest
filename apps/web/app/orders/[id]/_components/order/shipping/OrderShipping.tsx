// OrderShipping.tsx

import { IOrder } from "@repo/shared";

interface Props {
  order: IOrder;
}

const OrderShipping = ({ order }: Props) => {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium">Shipping</h2>

      <div className="rounded-lg border p-4 space-y-1 text-sm">
        <p>{order.customerName}</p>

        <p>{order.customerEmail}</p>

        {order.customerPhone && <p>{order.customerPhone}</p>}

        <div className="pt-2 text-muted-foreground">
          <p>{order.shippingAddress1}</p>

          {order.shippingAddress2 && <p>{order.shippingAddress2}</p>}

          <p>
            {order.shippingCity}, {order.shippingCountry}
          </p>

          {order.shippingPostalCode && <p>{order.shippingPostalCode}</p>}
        </div>

        {order.shippingNote && (
          <p className="pt-2">Note: {order.shippingNote}</p>
        )}
      </div>
    </section>
  );
};

export default OrderShipping;
