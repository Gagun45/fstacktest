import { Heart } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

type Props = {
  isFavorite: boolean;
  onClick: () => void;
};

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="group rounded-full hover:bg-red-50"
    >
      <Heart
        className={clsx(
          "size-5 transition-all duration-200 group-hover:scale-110",
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground group-hover:text-red-500",
        )}
      />
    </Button>
  );
};

export default FavoriteButton;
