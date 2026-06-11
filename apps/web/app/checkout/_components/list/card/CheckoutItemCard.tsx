import { buttonVariants } from "@/components/ui/button";
import { frontendUrls } from "@/lib/frontendUrls";
import { ICartItem } from "@/redux/slices/cart-slice";
import Image from "next/image";
import Link from "next/link";

interface Props {
  item: ICartItem;
}

const CheckoutItemCard = ({ item }: Props) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md border">
        <Image
          alt={item.title}
          src={item.images[0]?.url ?? "/default-poster.jpg"}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={frontendUrls.products.details(item.id)}
          className={`${buttonVariants({
            variant: "link",
          })} text-base! p-0!`}
        >
          {item.title}
        </Link>

        <p className="text-sm text-muted-foreground">
          ${item.price} × {item.quantity}
        </p>
      </div>

      <span className="font-medium">${item.price * item.quantity}</span>
    </div>
  );
};

export default CheckoutItemCard;
