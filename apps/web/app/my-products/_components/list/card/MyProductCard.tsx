import DashboardCard from "@/app/products/_components/list/card/DashboardCard";
import { frontendUrls } from "@/lib/frontendUrls";
import { IMyProduct } from "@repo/shared";
import Link from "next/link";

interface Props {
  product: IMyProduct;
}

const MyProductCard = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-2 border p-2">
      <DashboardCard product={product} />
      <Link href={frontendUrls.products.edit(product.id)}>Edit</Link>
    </div>
  );
};

export default MyProductCard;
