export const orderKeys = {
  orders: ["orders"] as const,
  sales: ["sales"] as const,
  order: (id: number) => ["order", id],
};
