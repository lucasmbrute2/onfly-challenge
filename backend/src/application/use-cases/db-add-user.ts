import { User } from '@/src/domain/entities/user'
import { AddUserRepository, FindUserByIdRepository } from '../protocols/user'
import { AddUserModel } from '@/src/domain/use-cases/add-user'

export class DbAddUserUseCase {
  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async add(userData: AddUserModel): Promise<User | null> {
    let user = await this.findUserByIdRepository.find(userData.id)
    if (user) return null

    user = new User(userData)
    return await this.addUserRepository.add(user)
  }
}
