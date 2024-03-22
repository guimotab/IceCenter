/*
  Warnings:

  - A unique constraint covering the columns `[stockId]` on the table `FlavorsIceCream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FlavorsIceCream_stockId_key" ON "FlavorsIceCream"("stockId");
