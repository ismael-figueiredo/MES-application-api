import { Prisma, Operation } from '@prisma/client'

export interface OperationsRepository {
  create(data: Prisma.OperationUncheckedCreateInput): Promise<Operation>
  findByName(name: string): Promise<Operation | null>
}
