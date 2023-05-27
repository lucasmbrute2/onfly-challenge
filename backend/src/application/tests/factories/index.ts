import { User } from '@/src/domain/entities/user'
import { AddUserRepository } from '../../protocols'
import { AddUserModel } from '@/src/domain/use-cases/add-user'

export const makeUserModel = (): AddUserModel => ({
  id: 'any-id',
  name: 'any-name',
  password: 'any-password',
  username: 'any-username',
})

export const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add(userData: User): Promise<User> {
      return Promise.resolve(userData)
    }
  }

  return new AddUserRepositoryStub()
}
