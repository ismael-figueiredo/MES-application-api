import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { SearchUserUseCase } from './search-users-use-case'

let inMemoryRepository: InMemoryUsersRepository
let sut: SearchUserUseCase

describe('search user Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new SearchUserUseCase(inMemoryRepository)
  })

  it('should be able to list sectors', async () => {
    inMemoryRepository.create({
      name: 'John Doe',
      password_hash: 'password_hash',
      status: 'ACTIVE',
      sector_id: 1,
    })

    const users = await sut.execute({
      query: 'John Doe',
      page: 1,
    })

    expect(users.user[0]).contain({
      id: 'User-id',
      name: 'John Doe',
      sector_id: 1,
      status: 'ACTIVE',
      password_hash: 'password_hash',
    })
  })

  it('should filter users based on the provided query', async () => {
    await inMemoryRepository.create({
      name: 'John Doe',
      password_hash: 'password_hash',
      status: 'ACTIVE',
      sector_id: 1,
    })
    await inMemoryRepository.create({
      name: 'Isaac Newton',
      password_hash: 'password_hash',
      status: 'ACTIVE',
      sector_id: 1,
    })
    await inMemoryRepository.create({
      name: 'Barbara Andrade',
      password_hash: 'password_hash',
      status: 'ACTIVE',
      sector_id: 1,
    })

    const result = await sut.execute({ query: 'John', page: 1 })

    expect(result.user[0]).contain({
      id: 'User-id',
      name: 'John Doe',
      sector_id: 1,
      status: 'ACTIVE',
      password_hash: 'password_hash',
    })
  })

  it('should paginate the users correctly with 20 items per page', async () => {
    for (let i = 0; i < 25; i++) {
      await inMemoryRepository.create({
        name: `User${i}`,
        sector_id: 1,
        status: 'ACTIVE',
        password_hash: 'password_hash',
      })
    }

    const page1 = await sut.execute({ query: '', page: 1 })
    const page2 = await sut.execute({ query: '', page: 2 })
    expect(page1.user.length).toEqual(20)
    expect(page2.user.length).toEqual(5)
    expect(page1.user[0]).contain({ id: 'User-id', name: 'User0' })
    expect(page1.user[10]).contain({ id: 'User-id', name: 'User10' })
    expect(page2.user[0]).contain({ id: 'User-id', name: 'User20' })
  })
})
