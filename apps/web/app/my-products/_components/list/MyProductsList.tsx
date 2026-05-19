import { IMyProduct } from "@repo/shared";
import MyProductCard from "./card/MyProductCard";

interface Props {
  products: IMyProduct[];
}

const MyProductsList = ({ products }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <MyProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default MyProductsList;
