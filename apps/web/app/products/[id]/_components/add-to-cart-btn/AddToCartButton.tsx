import { Button } from "@/components/ui/button";
import { useCartItem } from "@/hooks/use-cart-item";
import { IProductCard } from "@repo/shared";

interface Props {
  product: IProductCard;
}

const AddToCartButton = ({ product }: Props) => {
  const { toggleCart, isAdded } = useCartItem(product);
  return (
    <Button
      variant={isAdded ? "destructive" : "default"}
      className="fixed bottom-0 left-0 right-0 w-full text-base h-10 rounded-md"
      onClick={toggleCart}
    >
      {isAdded ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
