import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteSectorUseCase } from './delete-sector-use-case'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let inMemorySectorsRepository: InMemorySectorsRepository
let sut: DeleteSectorUseCase

describe('Delete sector Use Case', () => {
  beforeEach(() => {
    inMemorySectorsRepository = new InMemorySectorsRepository()
    sut = new DeleteSectorUseCase(inMemorySectorsRepository)
  })

  it('should be able to delete a sector', async () => {
    await inMemorySectorsRepository.create({
      name: 'admin',
    })

    await sut.execute({
      id: 1,
    })
    expect(await inMemorySectorsRepository.findById(1)).toEqual(null)
  })
  it('should be able not be able to delete a sector if id does not exist', async () => {
    const idInvalid = 1343

    expect(
      async () =>
        await sut.execute({
          id: idInvalid,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
