import Products from "./_components/Products";

const ProductsPage = () => {
  return (
    <main>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Products</h1>

        <p className="text-muted-foreground">
          Browse our collection and find what you need.
        </p>
      </div>
      <Products />
    </main>
  );
};

export default ProductsPage;
