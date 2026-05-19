import { Button } from "@/components/ui/button";
import { frontendUrls } from "@/lib/frontendUrls";
import { useAppDispatch, useAppSelector } from "@/redux";
import { addToCart, removeFromCart } from "@/redux/slices/cart-slice";
import { IProductCard } from "@repo/shared";
import Image from "next/image";
import Link from "next/link";

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
      <div className="size-24 relative">
        <Image
          alt="previ"
          fill
          src={product.images[0]?.url ?? "/default-poster.jpg"}
        />
      </div>
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
      <Link href={frontendUrls.products.details(product.id)}>Go to</Link>
    </div>
  );
};

export default DashboardCard;
