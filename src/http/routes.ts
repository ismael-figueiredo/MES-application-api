import { FastifyInstance } from 'fastify'
import { userRegister } from './controllers/user-register'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userRegister)
  app.post('/sessions', authenticate)
}
