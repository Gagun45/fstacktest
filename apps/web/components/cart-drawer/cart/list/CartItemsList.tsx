import { ICartItem } from "@/redux/slices/cart-slice";
import CartItemCard from "./card/CartItemCard";

interface Props {
  items: ICartItem[];
}

const CartItemsList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartItemsList;
