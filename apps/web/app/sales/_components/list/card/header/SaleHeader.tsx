import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ISaleOrder } from "@repo/shared";

interface Props {
  sale: ISaleOrder;
}

const SaleHeader = ({ sale }: Props) => {
  return (
    <CardHeader className="flex-1">
      <CardTitle>Order #{sale.id}</CardTitle>

      <CardDescription>
        {new Date(sale.createdAt).toLocaleString()}
      </CardDescription>

      <p className="text-sm text-muted-foreground">
        {sale.items.length} item{sale.items.length !== 1 && "s"}
      </p>
    </CardHeader>
  );
};

export default SaleHeader;
