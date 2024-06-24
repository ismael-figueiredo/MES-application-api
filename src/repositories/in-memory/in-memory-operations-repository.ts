import { Prisma, Operation } from '@prisma/client'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { OperationsRepository } from '../operations-repository'

export class InMemoryOperationsRepository implements OperationsRepository {
  public items: Operation[] = []

  async findById(id: number) {
    const operation = this.items.find((item) => item.id === id)

    if (!operation) {
      return null
    }
    return operation
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
    const operation = this.items.find((items) => items.name === name)

    if (!operation) {
      return null
    }
    return operation
  }

  async create(data: Prisma.OperationUncheckedCreateInput) {
    const operation = {
      id: 1,
      name: data.name,
      sector_id: 1,
    }
    this.items.push(operation)
    return operation
  }

  async update(id: number, data: Prisma.OperationUncheckedUpdateInput) {
    const operation = this.items.find((operation) => operation.id === id)
    if (!operation) {
      throw new ResourceNotFoundError()
    }
    Object.assign(operation, data)
    return operation
  }
}
