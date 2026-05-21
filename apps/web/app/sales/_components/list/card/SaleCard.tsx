import { ISaleOrder } from "@repo/shared";
import SaleItemsList from "./list/SaleItemsList";

interface Props {
  sale: ISaleOrder;
}
const SaleCard = ({ sale }: Props) => {
  return (
    <div className="border border-blue-400 flex flex-col gap-2">
      <p>Order: #{sale.id}</p>
      <p>
        Shipping info: {sale.shippingInfo.customerEmail} -{" "}
        {sale.shippingInfo.shippingAddress1}
      </p>
      <SaleItemsList items={sale.items} />
    </div>
  );
};

export default SaleCard;
