/*
  Warnings:

  - You are about to drop the column `expenses` on the `Revenue` table. All the data in the column will be lost.
  - You are about to drop the column `profit` on the `Revenue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Revenue" DROP COLUMN "expenses",
DROP COLUMN "profit";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "revenueId" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sales_revenueId_key" ON "Sales"("revenueId");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "Revenue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
