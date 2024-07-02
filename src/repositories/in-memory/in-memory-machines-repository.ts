import { Prisma, Machine, $Enums } from '@prisma/client'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { MachinesRepository } from '../machines-repository'

export class InMemoryMachinesRepository implements MachinesRepository {
  public items: Machine[] = []

  async findById(id: number) {
    const machine = this.items.find((item) => item.id === id)

    if (!machine) {
      return null
    }
    return machine
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async delete(id: number) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findByName(name: string) {
    const machine = this.items.find((items) => items.name === name)

    if (!machine) {
      return null
    }
    return machine
  }

  async create(data: Prisma.MachineUncheckedCreateInput) {
    const machine = {
      id: 1,
      name: data.name,
      status: $Enums.Status.ACTIVE,
      sector_id: 1,
    }
    this.items.push(machine)
    return machine
  }

  async update(id: number, data: Prisma.MachineUncheckedUpdateInput) {
    const machine = this.items.find((machine) => machine.id === id)
    if (!machine) {
      throw new ResourceNotFoundError()
    }
    Object.assign(machine, data)
    return machine
  }
}
