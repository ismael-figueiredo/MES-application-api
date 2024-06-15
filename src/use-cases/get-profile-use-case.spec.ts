import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetProfileUseCase } from './get-profile-use-case'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let inMemoryRepository: InMemoryUsersRepository
let sut: GetProfileUseCase

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new GetProfileUseCase(inMemoryRepository)
  })
  it('should able to get user profile', async () => {
    const createdUser = await inMemoryRepository.create({
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      status: 'ACTIVE',
      sector_id: 1,
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'non-existent-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
