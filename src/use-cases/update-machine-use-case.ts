import { Prisma, Machine } from '@prisma/client'
import { MachinesRepository } from '@/repositories/machines-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface UpdateMachineUseCaseRequest {
  id: number
  data: Prisma.MachineUncheckedUpdateInput
}

interface UpdateMachineUseCaseResponse {
  machine: Machine
}
export class UpdateMachineUseCase {
  constructor(private machinesRepository: MachinesRepository) {}

  async execute({
    id,
    data,
  }: UpdateMachineUseCaseRequest): Promise<UpdateMachineUseCaseResponse> {
    const machineWithSameId = await this.machinesRepository.findById(id)
    if (!machineWithSameId) {
      throw new ResourceNotFoundError()
    }

    if (data.name) {
      const machineWithSameName = await this.machinesRepository.findByName(
        String(data.name),
      )
      if (machineWithSameName) {
        throw new ResourceAlreadyExistsError()
      }
    }

    const machine = await this.machinesRepository.update(id, data)
    return { machine }
  }
}
