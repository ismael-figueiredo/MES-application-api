import { Prisma, ReasonForScrap } from '@prisma/client'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ReasonForScrapRepository } from '../reasonsForScrap-repository'

export class InMemoryReasonForScrapRepository
  implements ReasonForScrapRepository
{
  public items: ReasonForScrap[] = []

  async findById(id: number) {
    const reason = this.items.find((item) => item.id === id)

    if (!reason) {
      return null
    }
    return reason
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
    const reason = this.items.find((items) => items.name === name)

    if (!reason) {
      return null
    }
    return reason
  }

  async create(data: Prisma.ReasonForScrapCreateInput) {
    const reason = {
      id: 1,
      name: data.name,
    }
    this.items.push(reason)
    return reason
  }

  async update(id: number, data: Prisma.ReasonForScrapUncheckedUpdateInput) {
    const reason = this.items.find((reason) => reason.id === id)
    if (!reason) {
      throw new ResourceNotFoundError()
    }
    Object.assign(reason, data)
    return reason
  }
}
