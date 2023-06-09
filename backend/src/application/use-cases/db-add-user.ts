import { User } from '@/src/domain/entities/user'
import { AddUserModel, AddUser } from '@/src/domain/use-cases/add-user'
import { Hasher } from '../protocols/cryptography'
import { FindUserByUsernameRepository } from '../protocols/user/find-user-by-username'
import { AddUserRepository } from '../protocols/user'

export class DbAddUserUseCase implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly findByUsernameRepository: FindUserByUsernameRepository,
  ) {}

  async add(userData: AddUserModel): Promise<User | null> {
    const userAlreadyExists =
      await this.findByUsernameRepository.findByUsername(userData.username)
    if (userAlreadyExists) return null

    const hashedPassword = await this.hasher.hash(userData?.password)
    const user = new User({ ...userData, password: hashedPassword })

    await this.addUserRepository.add(user)
    return user
  }
}
