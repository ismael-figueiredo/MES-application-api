import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public itens: User[] = []

  async findByName(name: string) {
    const user = this.itens.find((user) => user.name === name)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'data.id',
      name: data.name,
      status: data.status,
      avatar_url: data.avatar_url || null,
      password_hash: data.password_hash,
      sector_id: data.sector.connect?.id || 1,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.itens.push(user)
    return user
  }
}
