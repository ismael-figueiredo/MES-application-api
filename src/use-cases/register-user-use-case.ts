import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from '@/errors/user-alreadexistis-error'

interface UserRegisterUseCaseRequest {
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  password: string
  sector_id: number
}

interface RegisterUserUseCaseResponse {
  user: User
}
export class RegisterUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    password,
    status,
    sector_id,
  }: UserRegisterUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameName = await this.userRepository.findByName(name)
    if (userWithSameName) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      status,
      sector_id,
      password_hash,
    })
    return { user }
  }
}
