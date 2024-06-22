import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { compare } from 'bcryptjs'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

let inMemoryRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(inMemoryRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sectorId: 1,
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sectorId: 1,
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same name', async () => {
    await sut.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sectorId: 1,
    })

    expect(async () =>
      sut.execute({
        name: 'John Doe',
        password: '123456',
        status: 'ACTIVE',
        sectorId: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
