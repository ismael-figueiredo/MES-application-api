import { SectorsRepository } from '@/repositories/sectors-repository'
import { Sector } from '@prisma/client'

interface SearchSectorUseCaseRequest {
  query: string
  page: number
}
interface SearchSectorUseCaseResponse {
  sector: Sector[]
}

export class SearchSectorUseCase {
  constructor(private sectorsRepository: SectorsRepository) {}

  async execute({
    query,
    page,
  }: SearchSectorUseCaseRequest): Promise<SearchSectorUseCaseResponse> {
    const searchSectors = await this.sectorsRepository.searchMany(query, page)

    return { sector: searchSectors }
  }
}
