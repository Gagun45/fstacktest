import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux";
import {
  ICartItem,
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cart-slice";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";

interface Props {
  item: ICartItem;
}

const CartItemCard = ({ item }: Props) => {
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
    <div className="flex gap-3 rounded-lg border p-3 items-center">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={item.images[0]?.url ?? "/default-poster.jpg"}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="line-clamp-2 font-medium">{item.title}</h4>

            <p className="text-sm text-muted-foreground">${item.price}</p>
          </div>

          <Button variant="ghost" size="icon" onClick={handleRemove}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleDecrement}>
              <Minus className="size-4" />
            </Button>

            <span className="w-6 text-center">{item.quantity}</span>

            <Button variant="outline" size="icon" onClick={handleIncrement}>
              <Plus className="size-4" />
            </Button>
          </div>

          <span className="font-medium">${item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
