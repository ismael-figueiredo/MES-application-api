import { Prisma, Operation } from '@prisma/client'

export interface OperationsRepository {
  create(data: Prisma.OperationUncheckedCreateInput): Promise<Operation>
  update(
    id: number,
    data: Prisma.OperationUncheckedUpdateInput,
  ): Promise<Operation>
  delete(id: number): Promise<void>
  searchMany(query: string, page: number): Promise<Operation[]>
  findById(id: number): Promise<Operation | null>
  findByName(name: string): Promise<Operation | null>
}
