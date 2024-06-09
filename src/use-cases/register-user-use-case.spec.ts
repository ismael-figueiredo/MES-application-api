import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/errors/user-alreadexistis-error'

describe('Register User Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(inMemoryUsersRepository)

    const { user } = await registerUserUseCase.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sector_id: 1,
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(inMemoryUsersRepository)

    const { user } = await registerUserUseCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(inMemoryUsersRepository)

    await registerUserUseCase.execute({
      name: 'John Doe',
      password: '123456',
      status: 'ACTIVE',
      sector_id: 1,
    })

    expect(async () =>
      registerUserUseCase.execute({
        name: 'John Doe',
        password: '123456',
        status: 'ACTIVE',
        sector_id: 1,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
