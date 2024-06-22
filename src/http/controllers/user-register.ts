import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(5),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
    sectorId: z.number().default(1),
  })

  const { name, password, status, sectorId } = registerBodySchema.parse(
    request.body,
  )
  try {
    const registerUserUseCase = makeRegisterUseCase()

    await registerUserUseCase.execute({
      name,
      password,
      status,
      sectorId,
    })
  } catch (err) {
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
