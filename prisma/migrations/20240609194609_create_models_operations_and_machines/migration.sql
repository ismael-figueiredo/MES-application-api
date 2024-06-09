-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sector_id" INTEGER NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "machines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT DEFAULT 'ACTIVE',
    "sector_id" INTEGER NOT NULL,

    CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "operations_name_key" ON "operations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "machines_name_key" ON "machines"("name");

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
