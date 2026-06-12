interface Props {
  description: string;
}

const ProductDescription = ({ description }: Props) => {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-medium">Description</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </section>
  );
};

export default ProductDescription;
