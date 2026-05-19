import DashboardCard from "@/app/products/_components/list/card/DashboardCard";
import { IMyProduct } from "@repo/shared";
import Link from "next/link";

interface Props {
  product: IMyProduct;
}

const MyProductCard = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-2 border p-2">
      <DashboardCard product={product} />
      <Link href={`/products/${product.id}/edit`}>Edit</Link>
    </div>
  );
};

export default MyProductCard;
