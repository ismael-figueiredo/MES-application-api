import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { userRegisterUseCase } from '@/use-cases/register-user-use-case'

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
    await userRegisterUseCase({
      name,
      password,
      status,
      sector_id,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
