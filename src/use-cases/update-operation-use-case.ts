import { Prisma, Operation } from '@prisma/client'
import { OperationsRepository } from '@/repositories/operations-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface UpdateOperationUseCaseRequest {
  id: number
  data: Prisma.OperationUncheckedUpdateInput
}

interface UpdateOperationUseCaseResponse {
  operation: Operation
}
export class UpdateOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    id,
    data,
  }: UpdateOperationUseCaseRequest): Promise<UpdateOperationUseCaseResponse> {
    const operationWithSameId = await this.operationsRepository.findById(id)
    if (!operationWithSameId) {
      throw new ResourceNotFoundError()
    }

    if (data.name) {
      const operationWithSameName = await this.operationsRepository.findByName(
        String(data.name),
      )
      if (operationWithSameName) {
        throw new ResourceAlreadyExistsError()
      }
    }

    const operation = await this.operationsRepository.update(id, data)
    return { operation }
  }
}
