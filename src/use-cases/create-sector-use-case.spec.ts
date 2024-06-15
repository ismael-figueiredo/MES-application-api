import { expect, describe, it, beforeEach } from 'vitest'

import { CreateSectorUseCase } from './create-sector-use-case'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

let inMemoryRepository: InMemorySectorsRepository
let sut: CreateSectorUseCase

describe('Create sector Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemorySectorsRepository()
    sut = new CreateSectorUseCase(inMemoryRepository)
  })

  it('should be able to create a new sector', async () => {
    const { sector } = await sut.execute({
      name: 'admin',
    })
    expect(sector.id).toEqual(expect.any(Number))
  })

  it('should not be able to create a new sector with same name', async () => {
    await sut.execute({
      name: 'sector name',
    })

    expect(async () =>
      sut.execute({
        name: 'sector name',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
