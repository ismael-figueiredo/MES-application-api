import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public itens: User[] = []

  async findById(id: string) {
    const user = this.itens.find((user) => user.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByName(name: string) {
    const user = this.itens.find((user) => user.name === name)

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
    this.itens.push(user)
    return user
  }
}
