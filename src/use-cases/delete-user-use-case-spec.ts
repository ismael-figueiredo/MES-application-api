import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteUserUseCase } from './delete-user-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let inMemoryRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete sector Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryRepository)
  })

  it('should be able to delete a User', async () => {
    await inMemoryRepository.create({
      name: 'john doe',
      password_hash: '123456',
      status: 'ACTIVE',
      sector_id: 1,
    })

    await sut.execute({
      id: 'User-id',
    })
    expect(await inMemoryRepository.findById('User-id')).toEqual(null)
  })
  it('should be able not be able to delete a user if id does not exist', async () => {
    const idInvalid = 'User-id-invalid'

    expect(
      async () =>
        await sut.execute({
          id: idInvalid,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
