import { User } from '@/src/domain/entities/user'
import { AddUserRepository, FindUserByIdRepository } from '../../protocols/user'
import { AddUserModel } from '@/src/domain/use-cases/add-user'
import { Hasher } from '../../protocols/cryptography'
import { FindUserByUsernameRepository } from '../../protocols/user/find-user-by-username'

export const makeUserModel = (): AddUserModel => ({
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
    async findById(id: string): Promise<User> {
      return Promise.resolve(null)
    }
  }

  return new FindUserByIdRepositoryStub()
}

export const makeFindByUsernameRepositoryStub =
  (): FindUserByUsernameRepository => {
    class FindByUsernameRepositoryStub implements FindUserByUsernameRepository {
      async findByUsername(username: string): Promise<User> {
        return Promise.resolve(null)
      }
    }

    return new FindByUsernameRepositoryStub()
  }

export const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(plaintext: string): Promise<string> {
      return Promise.resolve(plaintext)
    }
  }

  return new HasherStub()
}
