import ProductCard from "@/app/products/_components/list/card/ProductCard";
import { useMe } from "@/features/auth/hooks/useMe";
import { useToggleFavorite } from "@/features/products/hooks/mutations/useToggleFavorite";
import { useGetFavoriteIds } from "@/features/products/hooks/queries/use-get-favorite-ids";
import { IMyProduct } from "@repo/shared";

interface Props {
  products: IMyProduct[];
}

const MyProductsList = ({ products }: Props) => {
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
          isMyProduct={true}
        />
      ))}
    </div>
  );
};

export default MyProductsList;
