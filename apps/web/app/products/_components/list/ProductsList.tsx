import { IProductCard } from "@repo/shared";
import { useGetFavoriteIds } from "@/features/products/hooks/queries/use-get-favorite-ids";
import { useToggleFavorite } from "@/features/products/hooks/mutations/useToggleFavorite";
import { useMe } from "@/features/auth/hooks/useMe";
import ProductCard from "./card/ProductCard";

interface Props {
  products: IProductCard[];
}

const ProductsList = ({ products }: Props) => {
  const { data: user } = useMe();
  const { data: favoriteIds = [] } = useGetFavoriteIds();
  const { mutate } = useToggleFavorite();
  const onToggleFavorite = (productId: number, isFavorite: boolean) => {
    mutate({ isFavorite, productId });
  };
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds?.includes(product.id)}
          onToggleFavorite={user ? onToggleFavorite : undefined}
        />
      ))}
    </div>
  );
};

export default ProductsList;
