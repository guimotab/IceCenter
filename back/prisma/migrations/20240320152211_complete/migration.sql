-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storeId" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockStore" (
    "id" TEXT NOT NULL,
    "cone" INTEGER NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "StockStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlavorsIceCream" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "FlavorsIceCream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockOnFlavors" (
    "stockId" TEXT NOT NULL,
    "flavorsId" TEXT NOT NULL,

    CONSTRAINT "StockOnFlavors_pkey" PRIMARY KEY ("stockId","flavorsId")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "cash" INTEGER NOT NULL,
    "profit" INTEGER NOT NULL,
    "expenses" INTEGER NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FlavorsIceCreamToStockStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ownerId_key" ON "Company"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_storeId_key" ON "Manager"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StockStore_storeId_key" ON "StockStore"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_storeId_key" ON "Address"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Revenue_storeId_key" ON "Revenue"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "_FlavorsIceCreamToStockStore_AB_unique" ON "_FlavorsIceCreamToStockStore"("A", "B");

-- CreateIndex
CREATE INDEX "_FlavorsIceCreamToStockStore_B_index" ON "_FlavorsIceCreamToStockStore"("B");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockStore" ADD CONSTRAINT "StockStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockOnFlavors" ADD CONSTRAINT "StockOnFlavors_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "StockStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockOnFlavors" ADD CONSTRAINT "StockOnFlavors_flavorsId_fkey" FOREIGN KEY ("flavorsId") REFERENCES "FlavorsIceCream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlavorsIceCreamToStockStore" ADD CONSTRAINT "_FlavorsIceCreamToStockStore_A_fkey" FOREIGN KEY ("A") REFERENCES "FlavorsIceCream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlavorsIceCreamToStockStore" ADD CONSTRAINT "_FlavorsIceCreamToStockStore_B_fkey" FOREIGN KEY ("B") REFERENCES "StockStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;
