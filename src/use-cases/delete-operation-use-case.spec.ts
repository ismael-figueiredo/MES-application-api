import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOperationsRepository } from '@/repositories/in-memory/in-memory-operations-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { DeleteOperationUseCase } from './delete-operation-use-case'

let inMemoryRepository: InMemoryOperationsRepository
let sut: DeleteOperationUseCase

describe('Delete operation Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryOperationsRepository()
    sut = new DeleteOperationUseCase(inMemoryRepository)
  })

  it('should be able to delete a operation.', async () => {
    await inMemoryRepository.create({
      name: 'first operation',
      sector_id: 1,
    })

    await sut.execute({
      id: 1,
    })
    expect(await inMemoryRepository.findById(1)).toEqual(null)
  })
  it('should be able not be able to delete a operation if id does not exist', async () => {
    const idInvalid = 1343

    expect(
      async () =>
        await sut.execute({
          id: idInvalid,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
