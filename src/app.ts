import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(3),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
    sectorId: z.number().default(1),
  })
  const { name, password, status, sectorId } = registerBodySchema.parse(
    request.body,
  )

  await prisma.user.create({
    data: {
      name,
      status,
      password_hash: password,
      sector_id: sectorId,
    },
  })
  return reply.status(201).send()
})
