import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface SearchUserUseCaseRequest {
  query: string
  page: number
}
interface SearchUserUseCaseResponse {
  user: User[]
}

export class SearchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    query,
    page,
  }: SearchUserUseCaseRequest): Promise<SearchUserUseCaseResponse> {
    const searchUsers = await this.usersRepository.searchMany(query, page)

    return { user: searchUsers }
  }
}
