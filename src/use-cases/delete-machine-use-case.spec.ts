import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteMachineUseCase } from './delete-machine-use-case'
import { InMemoryMachinesRepository } from '@/repositories/in-memory/in-memory-machines-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let inMemoryRepository: InMemoryMachinesRepository
let sut: DeleteMachineUseCase

describe('Delete machine Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryMachinesRepository()
    sut = new DeleteMachineUseCase(inMemoryRepository)
  })

  it('should be able to delete a machine.', async () => {
    await inMemoryRepository.create({
      name: 'admin',
      sector_id: 1,
    })

    await sut.execute({
      id: 1,
    })
    expect(await inMemoryRepository.findById(1)).toEqual(null)
  })
  it('should be able not be able to delete a machine if id does not exist', async () => {
    const idInvalid = 1343

    expect(
      async () =>
        await sut.execute({
          id: idInvalid,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
