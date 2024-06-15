import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findByName(name: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  searchMany(query: string, page: number): Promise<User[]>
  update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>
  delete(id: string): Promise<void>
}
