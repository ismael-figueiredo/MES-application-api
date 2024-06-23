import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateSectorUseCase } from './update-sector-use-case'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

let inMemoryRepository: InMemorySectorsRepository
let sut: UpdateSectorUseCase

describe('Update sector Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemorySectorsRepository()
    sut = new UpdateSectorUseCase(inMemoryRepository)
  })

  it('should update a sector successfully', async () => {
    const sector = await inMemoryRepository.create({
      name: 'Original Name',
    })
    const updatedSector = await inMemoryRepository.update(sector.id, {
      name: 'Updated Name',
    })
    expect(updatedSector.name).toEqual('Updated Name')
  })

  it('It should not be possible to update a sector with an already existing name.', async () => {
    const sector = await inMemoryRepository.create({
      name: 'Name one',
    })
    await inMemoryRepository.create({
      name: 'name two',
    })

    expect(async () =>
      sut.execute({
        data: { name: 'name two' },
        id: sector.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })

  it('should throw error if sector does not exist', async () => {
    await expect(
      sut.execute({
        id: 12,
        data: { name: 'sector name' },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
