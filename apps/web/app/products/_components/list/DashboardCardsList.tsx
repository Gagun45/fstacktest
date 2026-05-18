import { IProductCard } from "@repo/shared";
import DashboardCard from "./card/DashboardCard";

interface Props {
  products: IProductCard[];
}

const DashboardCardsList = ({ products }: Props) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {products.map((product) => (
        <DashboardCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default DashboardCardsList;
