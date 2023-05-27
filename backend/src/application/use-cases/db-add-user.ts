import { User } from '@/src/domain/entities/user'
import { AddUserModel, AddUser } from '@/src/domain/use-cases/add-user'
import { Hasher } from '../protocols/cryptography'
import { PrismaUserRepository } from '@/src/infra/db/prisma/user-repository'

export class DbAddUserUseCase implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly userRepository: PrismaUserRepository,
  ) {}

  async add(userData: AddUserModel): Promise<User | null> {
    const userAlreadyExists = await this.userRepository.findByUsername(
      userData.username,
    )
    if (userAlreadyExists) return null

    const hashedPassword = await this.hasher.hash(userData?.password)
    const user = new User({ ...userData, password: hashedPassword })

    await this.userRepository.add(user)
    return user
  }
}
