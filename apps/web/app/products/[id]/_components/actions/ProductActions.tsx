import { Button } from "@/components/ui/button";
import { IProductDetails } from "@repo/shared";
import ToggleFavoriteButton from "./fav-btn/ToggleFavoriteButton";
import { useCartItem } from "@/hooks/use-cart-item";

interface Props {
  product: IProductDetails;
}

const ProductActions = ({ product }: Props) => {
  const { isAdded, toggleCart } = useCartItem(product);
  const isOutOfStock = !product.isInStock;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`font-bold ${product.isInStock ? "text-green-600" : "text-destructive"}`}
          >
            {product.isInStock ? "In stock" : "Out of stock"}
          </p>
          <p className="text-xl font-medium">${product.price.toFixed(2)}</p>
        </div>
        <ToggleFavoriteButton productId={product.id} />
      </div>
      <Button
        disabled={isOutOfStock}
        variant={
          isOutOfStock ? "secondary" : isAdded ? "destructive" : "success"
        }
        className="w-full text-base h-10 rounded-md"
        onClick={toggleCart}
      >
        {isOutOfStock
          ? "Out of stock"
          : isAdded
            ? "Remove from cart"
            : "Add to cart"}
      </Button>
    </div>
  );
};

export default ProductActions;
