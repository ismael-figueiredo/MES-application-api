import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { Prisma } from '@prisma/client'

export default class PrismaUsersRepository implements UsersRepository {
  async searchMany(query: string, page: number) {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    })
    return users
  }

  async update(id: string, data: Prisma.UserUncheckedUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })
    return user
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

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
