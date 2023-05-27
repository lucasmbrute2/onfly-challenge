import { describe, expect, it, vi } from 'vitest'
import { SignUpController } from './signup-controller'
import { AddUser, AddUserModel } from '@/src/domain/use-cases/add-user'
import { User } from '@/src/domain/entities/user'
import { makeUserModel } from '@/src/application/tests/factories'

const makeFakeAccount = (): User => {
  return new User(makeUserModel())
}

const makeAddAccount = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(user: AddUserModel): Promise<User> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new AddUserStub()
}

interface SutTypes {
  sut: SignUpController
  addUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const addUserStub = makeAddAccount()
  const sut = new SignUpController(addUserStub)

  return {
    sut,
    addUserStub,
  }
}

describe('SignUp Controller', () => {
  it('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut()
    const addSpy = vi.spyOn(addUserStub, 'add')

    const httpRequest = {
      body: {
        username: 'invalid_email',
        name: 'jhon doe',
        password: '123456',
        passwordConfirm: '123456',
      },
    }
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      username: 'invalid_email',
      name: 'jhon doe',
      password: '123456',
    })
  })
})
