import { expect, describe, it, beforeEach } from 'vitest'
import { InMemorySectorsRepository } from '@/repositories/in-memory/in-memory-sectors-repository'
import { SearchSectorUseCase } from './search-sector-use-case'

let inMemoryRepository: InMemorySectorsRepository
let sut: SearchSectorUseCase

describe('search sector Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemorySectorsRepository()
    sut = new SearchSectorUseCase(inMemoryRepository)
  })

  it('should be able to list all sectors', async () => {
    inMemoryRepository.create({
      name: 'admin',
    })

    const sectors = await sut.execute({
      query: 'admin',
      page: 1,
    })

    expect(sectors).toEqual({ sector: [{ id: 1, name: 'admin' }] })
  })

  it('should filter sectors based on the provided query', async () => {
    await inMemoryRepository.create({ name: 'administration' })
    await inMemoryRepository.create({ name: 'finance' })
    await inMemoryRepository.create({ name: 'marketing' })

    const result = await sut.execute({ query: 'fin', page: 1 })

    expect(result.sector).toEqual([{ id: 1, name: 'finance' }])
  })

  it('should paginate the sectors correctly with 20 items per page', async () => {
    for (let i = 0; i < 25; i++) {
      await inMemoryRepository.create({ name: `sector${i}` })
    }

    const page1 = await sut.execute({ query: '', page: 1 })
    const page2 = await sut.execute({ query: '', page: 2 })

    expect(page1.sector).toHaveLength(20)
    expect(page2.sector).toHaveLength(5)
    expect(page1.sector[0]).toEqual({ id: 1, name: 'sector0' })
    expect(page2.sector[0]).toEqual({ id: 1, name: 'sector20' })
  })
})
