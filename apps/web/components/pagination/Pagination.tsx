"use client";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  hasNext,
  hasPrev,
  onPageChange,
  page,
  totalPages,
}: Props) => {
  const validatedPage = page > 0 ? page : 1;
  const goPrev = () => {
    if (hasPrev) onPageChange(page - 1);
  };
  const goNext = () => {
    if (hasNext) onPageChange(page + 1);
  };

  return (
    <div className="flex gap-8 items-center">
      <Button onClick={goPrev} disabled={!hasPrev}>
        Prev
      </Button>

      <span>
        Page {validatedPage} / {totalPages}
      </span>

      <Button onClick={goNext} disabled={!hasNext}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
