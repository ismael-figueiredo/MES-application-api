import { Prisma, Machine } from '@prisma/client'

export interface MachinesRepository {
  create(data: Prisma.MachineUncheckedCreateInput): Promise<Machine>
  findByName(name: string): Promise<Machine | null>
}
