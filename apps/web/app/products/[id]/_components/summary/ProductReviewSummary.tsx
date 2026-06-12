import { IProductDetails } from "@repo/shared";

interface Props {
  product: IProductDetails;
}

const ProductReviewSummary = ({ product }: Props) => {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <h3 className="font-medium">Rating</h3>

      <div className="flex items-end gap-2">
        <p className="text-3xl font-semibold">{product.rating.toFixed(1)}</p>

        <p className="text-sm text-muted-foreground">/ 5</p>
      </div>

      <p className="text-sm text-muted-foreground">
        Based on {product.totalReviews} reviews
      </p>

      {/* simple visual bar (fake but good UX) */}
      <div className="h-2 w-full rounded bg-muted overflow-hidden">
        <div
          className="h-full bg-black"
          style={{ width: `${(product.rating / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProductReviewSummary;
