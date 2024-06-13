import { Prisma, Sector } from '@prisma/client'
import { SectorsRepository } from '@/repositories/sectors-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

interface UpdateSectorUseCaseRequest {
  id: number
  data: Prisma.SectorUncheckedUpdateInput
}

interface UpdateSectorUseCaseResponse {
  sector: Sector
}
export class UpdateSectorUseCase {
  constructor(private sectorsRepository: SectorsRepository) {}

  async execute({
    id,
    data,
  }: UpdateSectorUseCaseRequest): Promise<UpdateSectorUseCaseResponse> {
    const sectorWithSameId = await this.sectorsRepository.findById(id)
    if (!sectorWithSameId) {
      throw new ResourceNotFoundError()
    }

    const sector = await this.sectorsRepository.update(id, data)
    return { sector }
  }
}
