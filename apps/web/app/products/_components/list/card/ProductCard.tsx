import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCartItem } from "@/hooks/use-cart-item";
import { frontendUrls } from "@/lib/frontendUrls";
import { IMyProduct, IProductCard } from "@repo/shared";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./fav-btn/FavoriteButton";

interface Props {
  product: IProductCard | IMyProduct;
  isFavorite: boolean;
  onToggleFavorite?: (productId: number, isFavorite: boolean) => void;
  isMyProduct?: boolean;
}
const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  isMyProduct,
}: Props) => {
  const { toggleCart, isAdded } = useCartItem(product);
  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <Link href={frontendUrls.products.details(product.id)}>
          <div className="relative aspect-square">
            <Image
              src={product.images[0]?.url ?? "/default-poster.jpg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <Link
          href={frontendUrls.products.details(product.id)}
          className="line-clamp-2 font-medium"
        >
          {product.title}
        </Link>

        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            ⭐ {product.rating} ({product.totalReviews})
          </p>
          {onToggleFavorite && (
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={() => onToggleFavorite(product.id, isFavorite)}
            />
          )}
        </div>
      </CardContent>

      <CardFooter>
        {isMyProduct ? (
          <div className="flex flex-col">
            <Button asChild className="w-full">
              <Link href={frontendUrls.products.edit(product.id)}>Edit</Link>
            </Button>
            <p>Total sold: {(product as IMyProduct).totalSold}</p>
          </div>
        ) : product.isInStock ? (
          <Button
            variant={isAdded ? "destructive" : "default"}
            className="w-full rounded-md bg-green-600"
            onClick={toggleCart}
          >
            {isAdded ? "Remove from cart" : "Add to cart"}{" "}
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Out of stock
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
