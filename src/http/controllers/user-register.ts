import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserUseCase } from '@/use-cases/register-user-use-case'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/errors/user-alreadexistis-error'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(5),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
    sector_id: z.number().default(1),
  })

  const { name, password, status, sector_id } = registerBodySchema.parse(
    request.body,
  )
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

    await registerUserUseCase.execute({
      name,
      password,
      status,
      sector_id,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
