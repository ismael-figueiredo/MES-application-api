import { MachinesRepository } from '@/repositories/machines-repository'
import { Machine } from '@prisma/client'

interface SearchMachineUseCaseRequest {
  query: string
  page: number
}
interface SearchMachineUseCaseResponse {
  machine: Machine[]
}

export class SearchMachineUseCase {
  constructor(private machineRepository: MachinesRepository) {}

  async execute({
    query,
    page,
  }: SearchMachineUseCaseRequest): Promise<SearchMachineUseCaseResponse> {
    const searchMachines = await this.machineRepository.searchMany(query, page)

    return { machine: searchMachines }
  }
}
