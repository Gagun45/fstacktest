/*
  Warnings:

  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;
