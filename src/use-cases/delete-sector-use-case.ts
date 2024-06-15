import { SectorsRepository } from '@/repositories/sectors-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

interface DeleteSectorUseCaseRequest {
  id: number
}

export class DeleteSectorUseCase {
  constructor(private sectorsRepository: SectorsRepository) {}

  async execute({ id }: DeleteSectorUseCaseRequest): Promise<void> {
    const doesSectorExist = await this.sectorsRepository.findById(id)
    if (!doesSectorExist) {
      throw new ResourceNotFoundError()
    }

    await this.sectorsRepository.delete(id)
  }
}
