import EditProduct from "./_components/EditProduct";

interface Props {
  params: Promise<{ id: string }>;
}

const EditProductPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <main>
      <h1>Edit product page</h1>
      <EditProduct id={Number(id)} />
    </main>
  );
};

export default EditProductPage;
