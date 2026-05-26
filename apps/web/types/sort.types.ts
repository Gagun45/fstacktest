import { ISortOrder } from "@repo/shared";

export type ISortValue<T extends string> = `${T}-${ISortOrder}`;

export type ISortOption<TField extends string> = {
  label: string;
  sortBy: TField;
  order: ISortOrder;
};
