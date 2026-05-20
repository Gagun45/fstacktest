import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux";
import {
  ICartItem,
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cart-slice";
import Image from "next/image";

interface Props {
  item: ICartItem;
}

const CheckoutItemCard = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  return (
    <div className="border p-2">
      <div className="size-24 relative">
        <Image alt="" src={item.images[0]?.url ?? "/default-poster.jpg"} fill />
      </div>
      <h4>
        {item.title} x {item.quantity}
      </h4>
      <div className="flex gap-4">
        <Button onClick={handleDecrement}>-</Button>
        <span>{item.quantity}</span>
        <Button onClick={handleIncrement}>+</Button>
        <span> = {item.quantity * item.price}</span>
      </div>
      <Button variant={"destructive"} onClick={handleRemove}>
        X
      </Button>
    </div>
  );
};

export default CheckoutItemCard;
