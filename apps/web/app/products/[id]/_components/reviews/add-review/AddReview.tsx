import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/features/reviews/hooks/mutations/use-create-review";
import { toast } from "sonner";

interface Props {
  productId: number;
}

const AddReview = ({ productId }: Props) => {
  const { mutate } = useCreateReview();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    mutate(
      {
        productId,
        dto: {
          rating,
          comment,
        },
      },
      {
        onError: (err) => {
          const msg = err.response?.data.message ?? "Something went wrong";
          toast.error(msg);
        },
        onSuccess: () => {
          toast.success("Thank you for the review!");
          setComment("");
        },
      },
    );
  };

  return (
    <div>
      <div>
        Rating
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setRating(value)}
            >
              <Star fill={value <= rating ? "currentColor" : "none"} />
            </Button>
          ))}
        </div>
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
      />

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddReview;
