import { Prisma, Sector } from '@prisma/client'
import { SectorsRepository } from '../sectors-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

export class InMemorySectorsRepository implements SectorsRepository {
  public items: Sector[] = []

  async findById(id: number) {
    const sector = this.items.find((item) => item.id === id)

    if (!sector) {
      return null
    }
    return sector
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async delete(id: number) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findByName(name: string) {
    const sector = this.items.find((items) => items.name === name)

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
    this.items.push(sector)
    return sector
  }

  async update(id: number, data: Prisma.SectorUncheckedUpdateInput) {
    const sector = this.items.find((sector) => sector.id === id)
    if (!sector) {
      throw new ResourceNotFoundError()
    }

    Object.assign(sector, data)
    return sector
  }
}
