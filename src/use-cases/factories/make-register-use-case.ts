import PrismaUsersRepository from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user-use-case'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

  return registerUserUseCase
}
