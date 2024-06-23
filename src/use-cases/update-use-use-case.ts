import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface UpdateUserUseCaseRequest {
  id: string
  data: Prisma.UserUncheckedUpdateInput
}

interface UpdateUserUseCaseResponse {
  user: User
}
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    data,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userWithSameId = await this.usersRepository.findById(id)
    if (!userWithSameId) {
      throw new ResourceNotFoundError()
    }
    if (data.name) {
      const userSameWithName = await this.usersRepository.findByName(
        String(data.name),
      )
      if (userSameWithName && userSameWithName.id !== id) {
        throw new ResourceAlreadyExistsError()
      }
    }
    const user = await this.usersRepository.update(id, data)
    return { user }
  }
}
