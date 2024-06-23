import { Operation } from '@prisma/client'
import { OperationsRepository } from '@/repositories/operations-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface CreateOperationUseCaseRequest {
  name: string
  sectorId: number
}

interface CreateOperationUseCaseResponse {
  operation: Operation
}
export class CreateOperationUseCase {
  constructor(private operationsRepository: OperationsRepository) {}

  async execute({
    sectorId,
    name,
  }: CreateOperationUseCaseRequest): Promise<CreateOperationUseCaseResponse> {
    const operationWithSameName = await this.operationsRepository.findByName(
      name,
    )

    if (operationWithSameName) {
      throw new ResourceAlreadyExistsError()
    }

    const operation = await this.operationsRepository.create({
      name,
      sector_id: sectorId,
    })
    return { operation }
  }
}
