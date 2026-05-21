import { Heart } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

type Props = {
  isFavorite: boolean;
  onClick: () => void;
};

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Heart
        className={clsx(
          "size-5 transition",
          isFavorite ? "fill-black text-black" : "text-black",
        )}
      />
    </Button>
  );
};

export default FavoriteButton;
