export const handleLowStockAlert = (
  updated: { stock: number; title: string; lowStockThreshold: number },
  previousStock: number,
) => {
  if (updated.stock === 0) {
    // TODO: Send "Out of Stock" notification / event
    console.warn(`Product ${updated.title} is now OUT OF STOCK`);
  } else if (
    updated.stock <= updated.lowStockThreshold &&
    previousStock > updated.lowStockThreshold
  ) {
    // TODO: Send low stock alert (email, queue, etc.)
    console.warn(`LOW STOCK ALERT: ${updated.title} - ${updated.stock} left`);
  }
};
