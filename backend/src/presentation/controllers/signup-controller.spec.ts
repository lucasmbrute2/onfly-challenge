import { describe, expect, it, vi } from 'vitest'
import { SignUpController } from './signup-controller'
import { AddUser } from '@/src/domain/use-cases/add-user'
import { makeAddAccount } from '../tests/factories'

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
