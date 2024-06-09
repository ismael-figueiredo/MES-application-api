import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  password: string
  status: string
  sector_id: number
}
export async function userRegisterUseCase({
  name,
  password,
  status,
  sector_id,
}: RegisterUserUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userExists = await prisma.user.findUnique({
    where: {
      name,
    },
  })
  if (userExists) {
    throw new Error('User already exists.')
  }
  await prisma.user.create({
    data: {
      name,
      status,
      password_hash,
      sector_id,
    },
  })
}
