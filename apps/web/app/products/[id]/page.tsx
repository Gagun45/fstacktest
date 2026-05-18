import ProductDetails from "./_components/ProductDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <main>
      <ProductDetails id={Number(id)} />
    </main>
  );
};

export default ProductDetailsPage;
