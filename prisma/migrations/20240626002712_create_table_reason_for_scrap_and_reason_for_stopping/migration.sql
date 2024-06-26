-- CreateTable
CREATE TABLE "reason_for_stopping" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "reason_for_stopping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reason_for_scrap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "reason_for_scrap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reason_for_stopping_name_key" ON "reason_for_stopping"("name");

-- CreateIndex
CREATE UNIQUE INDEX "reason_for_scrap_name_key" ON "reason_for_scrap"("name");
