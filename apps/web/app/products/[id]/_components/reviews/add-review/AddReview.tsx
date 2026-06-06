import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useCreateReview } from "@/features/reviews/hooks/mutations/use-create-review";
import { ICreateReviewDto, reviewSchema } from "@repo/shared";

interface Props {
  productId: number;
}

const AddReview = ({ productId }: Props) => {
  const { mutate } = useCreateReview();

  const form = useForm<ICreateReviewDto>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = (data: ICreateReviewDto) => {
    mutate(
      { productId, dto: data },
      {
        onError: (err) => {
          const msg = err.response?.data.message ?? "Something went wrong";
          toast.error(msg);
        },
        onSuccess: () => {
          toast.success("Thank you for the review!");
          form.reset();
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="rating"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Rating</FieldLabel>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => field.onChange(value)}
                >
                  <Star fill={value <= field.value ? "currentColor" : "none"} />
                </Button>
              ))}
            </div>
          </Field>
        )}
      />

      <Field>
        <FieldLabel>Comment</FieldLabel>

        <Textarea
          {...form.register("comment")}
          placeholder="Write your review..."
        />

        {form.formState.errors.comment && (
          <FieldError errors={[form.formState.errors.comment]} />
        )}
      </Field>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddReview;
