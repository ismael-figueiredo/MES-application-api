import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'

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

    const userWithSameEmail = await this.userRepository.findByName(name)
    if (userWithSameEmail) {
      throw new Error('Name already exists.')
    }

    await this.userRepository.create({
      name,
      status,
      sector: { connect: { id: sector_id } },
      password_hash,
    })
  }
}
