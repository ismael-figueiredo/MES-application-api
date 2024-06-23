import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateOperationUseCase } from './update-operation-use-case'
import { InMemoryOperationsRepository } from '@/repositories/in-memory/in-memory-operations-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

let inMemoryRepository: InMemoryOperationsRepository
let sut: UpdateOperationUseCase

describe('Update operation Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryOperationsRepository()
    sut = new UpdateOperationUseCase(inMemoryRepository)
  })

  it('should update a operation successfully', async () => {
    const operation = await inMemoryRepository.create({
      name: 'Original Name',
      sector_id: 1,
    })
    const updatedOperation = await inMemoryRepository.update(operation.id, {
      name: 'Updated Name',
    })
    expect(updatedOperation.name).toEqual('Updated Name')
  })

  it('It should not be possible to update a operation with an already existing name.', async () => {
    const operation = await inMemoryRepository.create({
      sector_id: 1,
      name: 'operation one',
    })
    await inMemoryRepository.create({
      sector_id: 1,
      name: 'operation two',
    })

    expect(async () =>
      sut.execute({
        data: { name: 'operation two' },
        id: operation.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })

  it('should throw error if operation does not exist', async () => {
    await expect(
      sut.execute({
        id: 12,
        data: { name: 'inexistent operation' },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
