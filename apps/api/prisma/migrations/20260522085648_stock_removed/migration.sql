/*
  Warnings:

  - You are about to drop the column `lowStockThreshold` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - Made the column `buyerId` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `isInStock` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_buyerId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "buyerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "lowStockThreshold",
DROP COLUMN "stock",
ADD COLUMN     "isInStock" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
