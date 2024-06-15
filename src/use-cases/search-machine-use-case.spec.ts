import { InMemoryMachinesRepository } from '@/repositories/in-memory/in-memory-machines-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchMachineUseCase } from './search-machine-use-case'

let inMemoryRepository: InMemoryMachinesRepository
let sut: SearchMachineUseCase

describe('search machine Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryMachinesRepository()
    sut = new SearchMachineUseCase(inMemoryRepository)
  })

  it('should be able to list machines', async () => {
    inMemoryRepository.create({
      name: 'lathe one',
      sector_id: 1,
    })

    const machines = await sut.execute({
      query: 'lathe one',
      page: 1,
    })

    expect(machines).toEqual({
      machine: [{ id: 1, name: 'lathe one', sector_id: 1, status: 'ACTIVE' }],
    })
  })
  it('should filter machines based on the provided query', async () => {
    await inMemoryRepository.create({ name: 'lathe one', sector_id: 1 })
    await inMemoryRepository.create({ name: 'lathe two', sector_id: 1 })
    await inMemoryRepository.create({ name: 'lathe three', sector_id: 1 })

    const result = await sut.execute({ query: 'one', page: 1 })

    expect(result.machine).toEqual([
      {
        id: 1,
        name: 'lathe one',
        sector_id: 1,
        status: 'ACTIVE',
      },
    ])
  })
  it('should paginate the machines correctly with 20 items per page', async () => {
    for (let i = 0; i < 25; i++) {
      await inMemoryRepository.create({ name: `machine${i}`, sector_id: 1 })
    }

    const page1 = await sut.execute({ query: '', page: 1 })
    const page2 = await sut.execute({ query: '', page: 2 })

    expect(page1.machine).toHaveLength(20)
    expect(page2.machine).toHaveLength(5)
    expect(page1.machine[0]).toEqual({
      id: 1,
      name: 'machine0',
      sector_id: 1,
      status: 'ACTIVE',
    })
    expect(page1.machine[10]).toEqual({
      id: 1,
      name: 'machine10',
      sector_id: 1,
      status: 'ACTIVE',
    })
    expect(page2.machine[0]).toEqual({
      id: 1,
      name: 'machine20',
      sector_id: 1,
      status: 'ACTIVE',
    })
  })
})
