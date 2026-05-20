import { ICartItem } from "@/redux/slices/cart-slice";
import CheckoutItemCard from "./card/CheckoutItemCard";

interface Props {
  items: ICartItem[];
}

const CheckoutItemsList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-2 border">
      {items.map((item) => (
        <CheckoutItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CheckoutItemsList;
