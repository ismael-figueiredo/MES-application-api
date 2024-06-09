import { Prisma, Sector } from '@prisma/client'

export interface SectorsRepository {
  create(data: Prisma.SectorUncheckedCreateInput): Promise<Sector>
  findByName(name: string): Promise<Sector | null>
}
