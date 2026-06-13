import { Button } from "@/components/ui/button";
import { useCartItem } from "@/hooks/use-cart-item";
import { IProductCard } from "@repo/shared";

interface Props {
  product: IProductCard;
}

const AddToCartButton = ({ product }: Props) => {
  const { toggleCart, isAdded } = useCartItem(product);
  const isOutOfStock = !product.isInStock;
  return (
    <Button
      disabled={isOutOfStock}
      variant={isOutOfStock ? "secondary" : isAdded ? "destructive" : "success"}
      className="fixed md:hidden bottom-0 left-0 right-0 w-full text-base h-12 border-none"
      onClick={toggleCart}
    >
      {isOutOfStock
        ? "Out of stock"
        : isAdded
          ? "Remove from cart"
          : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
