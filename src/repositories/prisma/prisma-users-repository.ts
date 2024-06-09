import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }

  async findByName(name: string) {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    })
    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
