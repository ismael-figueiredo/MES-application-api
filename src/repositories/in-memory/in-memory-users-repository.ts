import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByName(name: string) {
    const user = this.items.find((user) => user.name === name)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: 'User-id',
      name: data.name,
      status: data.status || 'ACTIVE',
      avatar_url: data.avatar_url || null,
      password_hash: data.password_hash,
      sector_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.items.push(user)
    return user
  }

  async delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async update(id: string, data: Prisma.UserUncheckedUpdateInput) {
    const user = this.items.find((user) => user.id === id)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    Object.assign(user, data)
    return user
  }
}
