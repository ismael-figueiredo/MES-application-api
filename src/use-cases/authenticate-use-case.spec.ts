import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate-use-case'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

let inMemoryRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryRepository)
  })
  it('should not authenticate with wrong password', async () => {
    await inMemoryRepository.create({
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      status: 'ACTIVE',
      sector_id: 1,
    })

    const { user } = await sut.execute({
      name: 'John Doe',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong username', async () => {
    await inMemoryRepository.create({
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      status: 'ACTIVE',
      sector_id: 1,
    })

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
