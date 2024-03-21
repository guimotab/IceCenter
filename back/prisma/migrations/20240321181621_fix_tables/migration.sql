/*
  Warnings:

  - You are about to drop the `StockOnFlavors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FlavorsIceCreamToStockStore` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stockId]` on the table `FlavorsIceCream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stockId` to the `FlavorsIceCream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StockOnFlavors" DROP CONSTRAINT "StockOnFlavors_flavorsId_fkey";

-- DropForeignKey
ALTER TABLE "StockOnFlavors" DROP CONSTRAINT "StockOnFlavors_stockId_fkey";

-- DropForeignKey
ALTER TABLE "_FlavorsIceCreamToStockStore" DROP CONSTRAINT "_FlavorsIceCreamToStockStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_FlavorsIceCreamToStockStore" DROP CONSTRAINT "_FlavorsIceCreamToStockStore_B_fkey";

-- AlterTable
ALTER TABLE "FlavorsIceCream" ADD COLUMN     "stockId" TEXT NOT NULL;

-- DropTable
DROP TABLE "StockOnFlavors";

-- DropTable
DROP TABLE "_FlavorsIceCreamToStockStore";

-- CreateIndex
CREATE UNIQUE INDEX "FlavorsIceCream_stockId_key" ON "FlavorsIceCream"("stockId");

-- AddForeignKey
ALTER TABLE "FlavorsIceCream" ADD CONSTRAINT "FlavorsIceCream_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "StockStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
