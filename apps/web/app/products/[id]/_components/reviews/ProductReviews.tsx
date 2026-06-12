import Loader from "@/components/general/Loader";
import { useGetReviews } from "@/features/reviews/hooks/queries/use-reviews";
import AddReview from "./add-review/AddReview";
import { convertDate } from "@/lib/date.converter";

interface Props {
  productId: number;
}

const ProductReviews = ({ productId }: Props) => {
  const { data, isLoading } = useGetReviews(productId);
  if (isLoading) return <Loader />;
  if (!data) return <p>Failed to load data</p>;
  const reviews = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <div className="flex flex-col flex-wrap gap-4">
      {reviews.map((rev) => (
        <p key={rev.id} className="border p-2">
          {rev.comment} - {rev.rating}* by {rev.user.username} at{" "}
          {convertDate(rev.createdAt)}
        </p>
      ))}
      <AddReview productId={productId} />
    </div>
  );
};

export default ProductReviews;
