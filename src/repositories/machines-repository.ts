import { Prisma, Machine } from '@prisma/client'

export interface MachinesRepository {
  create(data: Prisma.MachineUncheckedCreateInput): Promise<Machine>
  update(id: number, data: Prisma.MachineUncheckedUpdateInput): Promise<Machine>
  delete(id: number): Promise<void>
  searchMany(query: string, page: number): Promise<Machine[]>
  findById(id: number): Promise<Machine | null>
  findByName(name: string): Promise<Machine | null>
}
