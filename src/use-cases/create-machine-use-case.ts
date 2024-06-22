import { Machine } from '@prisma/client'
import { MachinesRepository } from '@/repositories/machines-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface CreateMachineUseCaseRequest {
  name: string
  sectorId: number
}

interface CreateMachineUseCaseResponse {
  machine: Machine
}
export class CreateMachineUseCase {
  constructor(private machinesRepository: MachinesRepository) {}

  async execute({
    sectorId,
    name,
  }: CreateMachineUseCaseRequest): Promise<CreateMachineUseCaseResponse> {
    const machineWithSameName = await this.machinesRepository.findByName(name)

    if (machineWithSameName) {
      throw new ResourceAlreadyExistsError()
    }

    const machine = await this.machinesRepository.create({
      name,
      sector_id: sectorId,
    })
    return { machine }
  }
}
