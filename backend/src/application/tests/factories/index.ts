import { User } from '@/src/domain/entities/user'
import { AddUserRepository, FindUserByIdRepository } from '../../protocols/user'
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

export const makeFindUserByIdRepository = (): FindUserByIdRepository => {
  class FindUserByIdRepositoryStub implements FindUserByIdRepository {
    async find(id: string): Promise<User> {
      return Promise.resolve(null)
    }
  }

  return new FindUserByIdRepositoryStub()
}
