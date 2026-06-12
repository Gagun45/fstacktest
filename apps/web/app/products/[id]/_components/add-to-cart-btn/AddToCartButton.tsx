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
      className="fixed md:hidden bottom-0 bg-green-600 left-0 right-0 w-full text-base h-12 border-none "
      onClick={toggleCart}
    >
      {isAdded ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
