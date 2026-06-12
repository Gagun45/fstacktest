import PageHeader from "@/components/general/PageHeader";
import Checkout from "./_components/Checkout";

const CheckoutPage = () => {
  return (
    <main>
      <PageHeader
        title="Checkout"
        description="Review your order and complete your purchase"
      />
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
