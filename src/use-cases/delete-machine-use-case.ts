import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { MachinesRepository } from '@/repositories/machines-repository'

interface DeleteMachineUseCaseRequest {
  id: number
}

export class DeleteMachineUseCase {
  constructor(private machineRepository: MachinesRepository) {}

  async execute({ id }: DeleteMachineUseCaseRequest): Promise<void> {
    const doesMachineExist = await this.machineRepository.findById(id)
    if (!doesMachineExist) {
      throw new ResourceNotFoundError()
    }

    await this.machineRepository.delete(id)
  }
}
