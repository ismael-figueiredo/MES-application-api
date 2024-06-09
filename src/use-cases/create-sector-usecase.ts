import { Sector } from '@prisma/client'
import { SectorsRepository } from '@/repositories/sectors-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-alread-existis-error'

interface CreateSectorUseCaseRequest {
  name: string
}

interface CreateSectorUseCaseResponse {
  sector: Sector
}
export class CreateSectorUseCase {
  constructor(private sectorsRepository: SectorsRepository) {}

  async execute({
    name,
  }: CreateSectorUseCaseRequest): Promise<CreateSectorUseCaseResponse> {
    const sectorWithSameName = await this.sectorsRepository.findByName(name)
    if (sectorWithSameName) {
      throw new ResourceAlreadyExistsError()
    }

    const sector = await this.sectorsRepository.create({
      name,
    })
    return { sector }
  }
}
