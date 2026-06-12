// OrderSummary.tsx

interface Props {
  total: number;
}

const OrderSummary = ({ total }: Props) => {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium">Summary</h2>

      <div className="rounded-lg border p-4 flex items-center justify-between">
        <span>Total</span>

        <span className="text-lg font-semibold">${total.toFixed(2)}</span>
      </div>
    </section>
  );
};

export default OrderSummary;
