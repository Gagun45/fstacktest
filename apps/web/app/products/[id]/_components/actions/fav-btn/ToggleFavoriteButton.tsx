import FavoriteButton from "@/app/products/_components/list/card/fav-btn/FavoriteButton";
import { useToggleFavorite } from "@/features/products/hooks/mutations/useToggleFavorite";
import { useGetFavoriteIds } from "@/features/products/hooks/queries/use-get-favorite-ids";

interface Props {
  productId: number;
}

const ToggleFavoriteButton = ({ productId }: Props) => {
  const { mutate } = useToggleFavorite();
  const { data: favoriteIds = [] } = useGetFavoriteIds();
  const isFavorite = favoriteIds?.includes(productId);
  const onToggleFavorite = () => {
    mutate({ isFavorite, productId });
  };

  return <FavoriteButton isFavorite={isFavorite} onClick={onToggleFavorite} />;
};

export default ToggleFavoriteButton;
