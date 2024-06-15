import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const isUser = await this.usersRepository.findById(id)
    if (!isUser) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(id)
  }
}
