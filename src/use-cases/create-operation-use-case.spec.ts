import { expect, describe, it, beforeEach } from 'vitest'

import { CreateOperationUseCase } from './create-operation-use-case'
import { InMemoryOperationsRepository } from '@/repositories/in-memory/in-memory-operations-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'

let inMemoryRepository: InMemoryOperationsRepository
let inMemorySectorRepository: InMemorySectorsRepository
let sut: CreateOperationUseCase

describe('Create operation Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryOperationsRepository()
    inMemorySectorRepository = new InMemorySectorsRepository()
    sut = new CreateOperationUseCase(inMemoryRepository)
  })

  it('should be able to create a new operation', async () => {
    const sector = await inMemorySectorRepository.create({
      name: 'turning',
    })

    const { operation } = await sut.execute({
      name: '1° face',
      sectorId: sector.id,
    })
    expect(operation.id).toEqual(1)
    expect(operation.name).toEqual('1° face')
  })

  it('should not be able to create a new operation with same name', async () => {
    const sector = await inMemorySectorRepository.create({
      name: 'turning',
    })
    await sut.execute({
      name: '1° face',
      sectorId: sector.id,
    })

    expect(async () =>
      sut.execute({
        name: '1° face',
        sectorId: sector.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
