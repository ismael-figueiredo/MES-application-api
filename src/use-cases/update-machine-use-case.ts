import { Prisma, Machine } from '@prisma/client'
import { MachinesRepository } from '@/repositories/machines-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

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

    const machine = await this.machinesRepository.update(id, data)
    return { machine }
  }
}
