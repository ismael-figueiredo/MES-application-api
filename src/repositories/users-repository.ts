import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  findByName(name: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
