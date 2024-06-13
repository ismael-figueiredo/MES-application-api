import { Prisma, Sector } from '@prisma/client'

export interface SectorsRepository {
  create(data: Prisma.SectorUncheckedCreateInput): Promise<Sector>
  update(id: number, data: Prisma.SectorUncheckedUpdateInput): Promise<Sector>
  delete(id: number): Promise<void>
  searchMany(query: string, page: number): Promise<Sector[]>
  findById(id: number): Promise<Sector | null>
  findByName(name: string): Promise<Sector | null>
}
