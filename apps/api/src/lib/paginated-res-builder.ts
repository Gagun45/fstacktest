// src/utils/pagination.ts

import { IPaginatedResponse } from "@repo/shared";

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): IPaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
