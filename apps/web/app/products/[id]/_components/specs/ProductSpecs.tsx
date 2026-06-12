import { IProductDetails } from "@repo/shared";

interface Props {
  product: IProductDetails;
}

const ProductSpecs = ({ product }: Props) => {
  if (!product.keyboard && !product.switches && !product.keycaps) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium">Specs</h2>

      <div className="space-y-2 text-sm">
        {product.keyboard && <p>Layout: {product.keyboard.layout}</p>}

        {product.switches && <p>Switches: {product.switches.switchType}</p>}

        {product.keycaps && <p>Keycaps: {product.keycaps.material}</p>}
      </div>
    </section>
  );
};

export default ProductSpecs;
