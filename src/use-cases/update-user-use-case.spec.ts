import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateMachineUseCase } from './update-machine-use-case'
import { InMemoryMachinesRepository } from '@/repositories/in-memory/in-memory-machines-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let inMemoryRepository: InMemoryMachinesRepository
let sut: UpdateMachineUseCase

describe('Update Machine Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryMachinesRepository()
    sut = new UpdateMachineUseCase(inMemoryRepository)
  })

  it('should update a machine successfully', async () => {
    const machine = await inMemoryRepository.create({
      name: 'Original Name',
      sector_id: 1,
    })
    const updatedMachine = await inMemoryRepository.update(machine.id, {
      name: 'Updated Name',
    })
    expect(updatedMachine.name).toEqual('Updated Name')
  })

  it('should throw error if user does not exist', async () => {
    await expect(
      sut.execute({
        id: 12,
        data: { name: 'inexistent user' },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
