import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addToCart, removeFromCart } from "@/redux/slices/cart-slice";
import { IProductCard } from "@repo/shared";

interface Props {
  product: IProductCard;
}
const DashboardCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const isAdded = cart.items.some((item) => item.id === product.id);
  const handleClick = () => {
    if (isAdded) {
      dispatch(removeFromCart(product.id));
    } else dispatch(addToCart(product));
  };
  return (
    <div className="border p-4">
      <h2>{product.title}</h2>
      <p>ID: {product.id}</p>
      {product.stock > 0 ? (
        <Button
          onClick={handleClick}
          variant={isAdded ? "destructive" : "default"}
        >
          {isAdded ? "Remove" : "Add to cart"}
        </Button>
      ) : (
        <p>OUT OF STOCK</p>
      )}
    </div>
  );
};

export default DashboardCard;
