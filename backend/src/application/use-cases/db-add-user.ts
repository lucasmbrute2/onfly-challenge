import { User } from '@/src/domain/entities/user'
import { AddUserRepository, FindUserByIdRepository } from '../protocols/user'
import { AddUserModel } from '@/src/domain/use-cases/add-user'
import { Hasher } from '../protocols/cryptography'

export class DbAddUserUseCase {
  constructor(
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async add(userData: AddUserModel): Promise<User | null> {
    const userAlreadyExists = await this.findUserByIdRepository.findById(
      userData.id,
    )
    if (userAlreadyExists) return null

    const hashedPassword = await this.hasher.hash(userData?.password)
    const user = new User({ ...userData, password: hashedPassword })

    await this.addUserRepository.add(user)
    return user
  }
}
