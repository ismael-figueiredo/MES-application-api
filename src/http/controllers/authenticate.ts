import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    password: z.string().min(5),
  })

  const { name, password } = authenticateBodySchema.parse(request.body)
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUseCase(
      prismaUsersRepository,
    )

    await authenticateUserUseCase.execute({
      name,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
