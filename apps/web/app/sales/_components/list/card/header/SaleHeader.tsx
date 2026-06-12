import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { convertDate } from "@/lib/date.converter";
import { ISaleOrder } from "@repo/shared";

interface Props {
  sale: ISaleOrder;
}

const SaleHeader = ({ sale }: Props) => {
  return (
    <CardHeader className="flex-1 px-0">
      <CardTitle>Order #{sale.id}</CardTitle>

      <CardDescription>{convertDate(sale.createdAt)}</CardDescription>

      <p className="text-sm text-muted-foreground">
        {sale.items.length} item{sale.items.length !== 1 && "s"}
      </p>
    </CardHeader>
  );
};

export default SaleHeader;
