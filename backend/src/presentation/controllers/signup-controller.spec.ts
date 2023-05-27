import { describe, expect, it, vi } from 'vitest'
import { SignUpController } from './signup-controller'
import { AddUser } from '@/src/domain/use-cases/add-user'
import { makeAddAccount } from '../tests/factories'
import { ServerError } from '../errors/server-error'
import { badRequest, created, serverError } from '../helpers/http-helper'
import { makeUserModel } from '@/src/application/tests/factories'
import { BadRequestError } from '../errors/bad-request-error'

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

  it('Should return 500 if AddUser throws', async () => {
    const { addUserStub, sut } = makeSut()
    vi.spyOn(addUserStub, 'add').mockImplementation(async () =>
      Promise.reject(new Error()),
    )

    const httpResponse = await sut.handle({
      body: makeUserModel(),
    })

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 201 if correct data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      body: makeUserModel(),
    })

    expect(httpResponse).toEqual(created(httpResponse.body))
    expect(httpResponse.statusCode).toBe(201)
  })

  it('Should return 400 if incorrect data is provided', async () => {
    const { sut, addUserStub } = makeSut()
    vi.spyOn(addUserStub, 'add').mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle({
      body: makeUserModel(),
    })

    expect(httpResponse).toEqual(
      badRequest(new BadRequestError('User already exists')),
    )
    expect(httpResponse.statusCode).toBe(400)
  })
})
