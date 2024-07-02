import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateUserUseCase } from './update-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

let inMemoryRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update user Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(inMemoryRepository)
  })

  it('should update a user successfully', async () => {
    const User = await inMemoryRepository.create({
      name: 'Original Name',
      sector_id: 1,
      password_hash: 'password_hash',
    })
    const updatedUser = await inMemoryRepository.update(User.id, {
      name: 'Updated Name',
      avatar_url: 'https://example.com/avatar.png',
      sector_id: 2,
      status: 'DISABLED',
    })
    expect(updatedUser.name).toEqual('Updated Name')
    expect(updatedUser.avatar_url).toEqual('https://example.com/avatar.png')
    expect(updatedUser.sector_id).toEqual(2)
    expect(updatedUser.status).toEqual('DISABLED')
  })

  it('should throw error if user does not exist', async () => {
    await expect(
      sut.execute({
        id: 'inexistent user-id',
        data: { name: 'inexistent user' },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('It should not be possible to update a user with an already existing name.', async () => {
    const user = await inMemoryRepository.create({
      name: 'john doe',
      sector_id: 1,
      password_hash: 'password_hash',
    })
    await inMemoryRepository.create({
      name: 'Isaac Newton',
      sector_id: 1,
      password_hash: 'password_hash',
    })

    expect(async () =>
      sut.execute({
        data: { name: 'Isaac Newton' },
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
