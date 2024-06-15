import { expect, describe, it, beforeEach } from 'vitest'

import { CreateMachineUseCase } from './create-machine-use-case'
import { InMemoryMachinesRepository } from '@/repositories/in-memory/in-memory-machines-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'

let inMemoryRepository: InMemoryMachinesRepository
let inMemorySectorRepository: InMemorySectorsRepository
let sut: CreateMachineUseCase

describe('Create Machine Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryMachinesRepository()
    inMemorySectorRepository = new InMemorySectorsRepository()
    sut = new CreateMachineUseCase(inMemoryRepository)
  })

  it('should be able to create a new machine', async () => {
    const sector = await inMemorySectorRepository.create({
      name: 'turning',
    })

    const { machine } = await sut.execute({
      name: 'lathe one',
      sector_id: sector.id,
    })
    expect(machine.id).toEqual(1)
    expect(machine.name).toEqual('lathe one')
  })

  it('should not be able to create a new machine with same name', async () => {
    const sector = await inMemorySectorRepository.create({
      name: 'turning',
    })
    await sut.execute({
      name: 'lathe one',
      sector_id: sector.id,
    })

    expect(async () =>
      sut.execute({
        name: 'lathe one',
        sector_id: sector.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
