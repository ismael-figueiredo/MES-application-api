import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { compare } from 'bcryptjs'
import { ResourceAlreadyExistsError } from '@/errors/resource-alread-existis-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sector_id: 1,
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sector_id: 1,
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to registerwith same name', async () => {
    await sut.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sector_id: 1,
    })

    expect(async () =>
      sut.execute({
        name: 'John Doe',
        password: '123456',
        status: 'ACTIVE',
        sector_id: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
