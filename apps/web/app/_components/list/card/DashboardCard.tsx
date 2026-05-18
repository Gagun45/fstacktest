import { IProductCard } from "@repo/shared";

interface Props {
  product: IProductCard;
}
const DashboardCard = ({ product }: Props) => {
  return (
    <div className="border p-4">
      <h2>{product.title}</h2>
      <p>ID: {product.id}</p>
    </div>
  );
};

export default DashboardCard;
