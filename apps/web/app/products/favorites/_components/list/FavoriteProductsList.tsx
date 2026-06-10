import ProductCard from "@/app/products/_components/list/card/ProductCard";
import { useToggleFavorite } from "@/features/products/hooks/mutations/useToggleFavorite";
import { IProductCard } from "@repo/shared";

interface Props {
  products: IProductCard[];
}

const FavoriteProductsList = ({ products }: Props) => {
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
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default FavoriteProductsList;
