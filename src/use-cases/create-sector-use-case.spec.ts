import { expect, describe, it, beforeEach } from 'vitest'

import { CreateSectorUseCase } from './create-sector-usecase'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-alread-existis-error'

let inMemorySectorsRepository: InMemorySectorsRepository
let sut: CreateSectorUseCase

describe('Create sector Use Case', () => {
  beforeEach(() => {
    inMemorySectorsRepository = new InMemorySectorsRepository()
    sut = new CreateSectorUseCase(inMemorySectorsRepository)
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
