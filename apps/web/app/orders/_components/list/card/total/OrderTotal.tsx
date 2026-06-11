interface Props {
  total: number;
}

const OrderTotal = ({ total }: Props) => {
  return (
    <div className="flex items-center justify-between border-t pt-4">
      <span className="text-sm text-muted-foreground">Total</span>

      <span className="text-lg font-semibold">${total.toFixed(2)}</span>
    </div>
  );
};

export default OrderTotal;
