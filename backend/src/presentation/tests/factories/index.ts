import { makeUserModel } from '@/src/application/tests/factories'
import { User } from '@/src/domain/entities/user'
import { AddUser, AddUserModel } from '@/src/domain/use-cases/add-user'

export const makeFakeAccount = (): User => {
  return new User(makeUserModel())
}

export const makeAddAccount = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(user: AddUserModel): Promise<User> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new AddUserStub()
}
