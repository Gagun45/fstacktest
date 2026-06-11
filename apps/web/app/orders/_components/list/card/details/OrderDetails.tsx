import { IOrder } from "@repo/shared";

interface Props {
  order: IOrder;
}

const OrderDetails = ({ order }: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Customer</p>

          <p>{order.customerName}</p>
          <p>{order.customerEmail}</p>

          {order.customerPhone && <p>{order.customerPhone}</p>}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Shipping Address</p>

          <p>{order.shippingAddress1}</p>

          {order.shippingAddress2 && <p>{order.shippingAddress2}</p>}

          <p>
            {order.shippingCity}, {order.shippingCountry}
          </p>

          {order.shippingPostalCode && <p>{order.shippingPostalCode}</p>}
        </div>
      </div>

      {order.shippingNote && (
        <div>
          <p className="text-sm text-muted-foreground">Note</p>

          <p>{order.shippingNote}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
