/*
  Warnings:

  - Added the required column `shippingAddress1` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCity` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCountry` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_buyerId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shippingAddress1" TEXT NOT NULL,
ADD COLUMN     "shippingAddress2" TEXT,
ADD COLUMN     "shippingCity" TEXT NOT NULL,
ADD COLUMN     "shippingCountry" TEXT NOT NULL,
ADD COLUMN     "shippingNote" TEXT,
ADD COLUMN     "shippingPostalCode" TEXT,
ALTER COLUMN "buyerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
