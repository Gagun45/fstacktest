import Order from "./_components/order/Order";

interface Props {
  params: Promise<{ id: string }>;
}

const OrderPage = async ({ params }: Props) => {
  const { id } = await params;
  const orderId = +id;
  return (
    <main>
      <Order orderId={orderId} />
    </main>
  );
};

export default OrderPage;
