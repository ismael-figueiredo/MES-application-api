import { OperationsRepository } from '@/repositories/operations-repository'
import { Operation } from '@prisma/client'

interface SearchOperationUseCaseRequest {
  query: string
  page: number
}
interface SearchOperationUseCaseResponse {
  operation: Operation[]
}

export class SearchOperationUseCase {
  constructor(private operationRepository: OperationsRepository) {}

  async execute({
    query,
    page,
  }: SearchOperationUseCaseRequest): Promise<SearchOperationUseCaseResponse> {
    const searchOperation = await this.operationRepository.searchMany(
      query,
      page,
    )

    return { operation: searchOperation }
  }
}
