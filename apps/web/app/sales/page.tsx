import PageHeader from "@/components/general/PageHeader";
import Sales from "./_components/Sales";

const SalesPage = () => {
  return (
    <main>
      <PageHeader title="Sales" description="Track and manage your sales" />

      <Sales />
    </main>
  );
};

export default SalesPage;
