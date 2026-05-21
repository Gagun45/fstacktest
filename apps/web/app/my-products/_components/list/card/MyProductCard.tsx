import { frontendUrls } from "@/lib/frontendUrls";
import { IProductCard } from "@repo/shared";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: IProductCard;
}
const MyProductCard = ({ product }: Props) => {
  return (
    <div className="border p-4">
      <h2>{product.title}</h2>
      <p>ID: {product.id}</p>
      <div className="size-24 relative">
        <Image
          alt="previ"
          fill
          src={product.images[0]?.url ?? "/default-poster.jpg"}
        />
      </div>
      <p>Stock: {product.stock}</p>
      <Link href={frontendUrls.products.details(product.id)}>Go to</Link>
      <Link href={frontendUrls.products.edit(product.id)}>Edit</Link>
    </div>
  );
};

export default MyProductCard;
