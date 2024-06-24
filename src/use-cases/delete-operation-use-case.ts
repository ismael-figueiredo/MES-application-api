import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { OperationsRepository } from '@/repositories/operations-repository'

interface DeleteOperationUseCaseRequest {
  id: number
}

export class DeleteOperationUseCase {
  constructor(private operationRepository: OperationsRepository) {}

  async execute({ id }: DeleteOperationUseCaseRequest): Promise<void> {
    const doesOperationExist = await this.operationRepository.findById(id)
    if (!doesOperationExist) {
      throw new ResourceNotFoundError()
    }

    await this.operationRepository.delete(id)
  }
}
