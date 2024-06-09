import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from '@/errors/user-alreadexistis-error'

interface UserRegisterUseCaseRequest {
  name: string
  status: 'ACTIVE' | 'INACTIVE'
  password: string
  sector_id: number
}
export class RegisterUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    password,
    status,
    sector_id,
  }: UserRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameName = await this.userRepository.findByName(name)
    if (userWithSameName) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      name,
      status,
      sector: { connect: { id: sector_id } },
      password_hash,
    })
  }
}
