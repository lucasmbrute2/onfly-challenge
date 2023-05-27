import { User } from '@/src/domain/entities/user'
import { AddUserRepository } from '../protocols/user'
import { AddUserModel, AddUser } from '@/src/domain/use-cases/add-user'
import { Hasher } from '../protocols/cryptography'
import { FindUserByUsernameRepository } from '../protocols/user/find-user-by-username'

export class DbAddUserUseCase implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly findByUsername: FindUserByUsernameRepository,
  ) {}

  async add(userData: AddUserModel): Promise<User | null> {
    const userAlreadyExists = await this.findByUsername.findByUsername(
      userData.username,
    )
    if (userAlreadyExists) return null

    const hashedPassword = await this.hasher.hash(userData?.password)
    const user = new User({ ...userData, password: hashedPassword })

    await this.addUserRepository.add(user)
    return user
  }
}
