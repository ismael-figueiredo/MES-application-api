import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryOperationsRepository } from '@/repositories/in-memory/in-memory-operations-repository'
import { SearchOperationUseCase } from './search-operation-use-case'

let inMemoryRepository: InMemoryOperationsRepository
let sut: SearchOperationUseCase

describe('search operation Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryOperationsRepository()
    sut = new SearchOperationUseCase(inMemoryRepository)
  })

  it('should be able to list operations', async () => {
    inMemoryRepository.create({
      name: 'operation one',
      sector_id: 1,
    })

    const operation = await sut.execute({
      query: 'operation one',
      page: 1,
    })

    expect(operation).toEqual({
      operation: [{ id: 1, name: 'operation one', sector_id: 1 }],
    })
  })

  it('should filter operations based on the provided query', async () => {
    await inMemoryRepository.create({ name: 'operation one', sector_id: 1 })
    await inMemoryRepository.create({ name: 'operation two', sector_id: 1 })
    await inMemoryRepository.create({ name: 'operation three', sector_id: 1 })

    const result = await sut.execute({ query: 'one', page: 1 })

    expect(result.operation).toEqual([
      {
        id: 1,
        name: 'operation one',
        sector_id: 1,
      },
    ])
  })
  it('should paginate the operations correctly with 20 items per page', async () => {
    for (let i = 0; i < 25; i++) {
      await inMemoryRepository.create({ name: `operation${i}`, sector_id: 1 })
    }

    const page1 = await sut.execute({ query: '', page: 1 })
    const page2 = await sut.execute({ query: '', page: 2 })

    expect(page1.operation).toHaveLength(20)
    expect(page2.operation).toHaveLength(5)
    expect(page1.operation[0]).toEqual({
      id: 1,
      name: 'operation0',
      sector_id: 1,
    })
    expect(page1.operation[10]).toEqual({
      id: 1,
      name: 'operation10',
      sector_id: 1,
    })
    expect(page2.operation[0]).toEqual({
      id: 1,
      name: 'operation20',
      sector_id: 1,
    })
  })
})
