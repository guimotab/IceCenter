/*
  Warnings:

  - Added the required column `price` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revenue" ALTER COLUMN "cash" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
