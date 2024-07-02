import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  password: string
  sectorId: number
}

interface RegisterUserUseCaseResponse {
  user: User
}
export class RegisterUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    password,
    sectorId,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameName = await this.userRepository.findByName(name)
    if (userWithSameName) {
      throw new ResourceAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      status: 'ACTIVE',
      sector_id: sectorId,
      password_hash: passwordHash,
    })
    return { user }
  }
}
