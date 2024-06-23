-- CreateTable
CREATE TABLE "times_of_operations" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "item" INTEGER NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "machine_id" INTEGER NOT NULL,

    CONSTRAINT "times_of_operations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "times_of_operations" ADD CONSTRAINT "times_of_operations_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "operations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times_of_operations" ADD CONSTRAINT "times_of_operations_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
