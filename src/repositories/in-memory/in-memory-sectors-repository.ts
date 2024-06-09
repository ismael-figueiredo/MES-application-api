import { Prisma, Sector } from '@prisma/client'
import { SectorsRepository } from '../sectors-repository'

export class InMemorySectorsRepository implements SectorsRepository {
  public itens: Sector[] = []

  async findByName(name: string) {
    const sector = this.itens.find((itens) => itens.name === name)

    if (!sector) {
      return null
    }
    return sector
  }

  async create(data: Prisma.SectorUncheckedCreateInput) {
    const sector = {
      id: 1,
      name: data.name,
    }
    this.itens.push(sector)
    return sector
  }
}
