import { FastifyInstance } from 'fastify'
import { userRegister } from './controllers/user-register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
}
