import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetProfileUseCaseRequest {
  userId: string
}
interface GetProfileUseCaseResponse {
  user: User
}

export class GetProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
