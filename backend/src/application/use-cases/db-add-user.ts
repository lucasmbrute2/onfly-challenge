import { User } from '@/src/domain/entities/user'
import { AddUserRepository } from '../protocols'
import { AddUserModel } from '@/src/domain/use-cases/add-user'

export class DbAddUserUseCase {
  constructor(private readonly addUserRepository: AddUserRepository) {}

  async add(userData: AddUserModel): Promise<User> {
    const user = new User(userData)
    return await this.addUserRepository.add(user)
  }
}
