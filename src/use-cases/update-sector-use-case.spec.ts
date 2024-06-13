import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateSectorUseCase } from './update-sector-use-case'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let inMemorySectorsRepository: InMemorySectorsRepository
let sut: UpdateSectorUseCase

describe('Update sector Use Case', () => {
  beforeEach(() => {
    inMemorySectorsRepository = new InMemorySectorsRepository()
    sut = new UpdateSectorUseCase(inMemorySectorsRepository)
  })

  it('should update a sector successfully', async () => {
    const sector = await inMemorySectorsRepository.create({
      name: 'Original Name',
    })
    const updatedSector = await inMemorySectorsRepository.update(sector.id, {
      name: 'Updated Name',
    })
    expect(updatedSector.name).toEqual('Updated Name')
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
