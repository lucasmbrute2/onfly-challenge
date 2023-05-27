import { describe, expect, it, vi } from 'vitest'
import { AddUserRepository, FindUserByIdRepository } from '../protocols/user'
import {
  makeAddUserRepository,
  makeFindUserByIdRepository,
  makeUserModel,
} from '../tests/factories'
import { DbAddUserUseCase } from './db-add-user'
import { User } from '@/src/domain/entities/user'
import { makeUser } from '@/src/domain/entities/tests/factories'

interface SutTypes {
  sut: DbAddUserUseCase
  addUserRepositoryStub: AddUserRepository
  findUserByIdRepository: FindUserByIdRepository
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository()
  const findUserByIdRepository = makeFindUserByIdRepository()
  const dbAddUserUseCase = new DbAddUserUseCase(
    addUserRepositoryStub,
    findUserByIdRepository,
  )

  return {
    sut: dbAddUserUseCase,
    addUserRepositoryStub,
    findUserByIdRepository,
  }
}

describe('DbAddUser Use Case', () => {
  it('Should call AddUserRepository with correct values', async () => {
    const { addUserRepositoryStub, sut } = makeSut()
    const addSpy = vi.spyOn(addUserRepositoryStub, 'add')

    const response = await sut.add(makeUserModel())
    const user = new User({ ...makeUserModel(), id: response?.id })
    expect(addSpy).toHaveBeenCalledWith(user)
  })

  it('Should return null if FindUserByIdRepository reach an user', async () => {
    const { sut, findUserByIdRepository } = makeSut()
    vi.spyOn(findUserByIdRepository, 'findById').mockReturnValueOnce(
      Promise.resolve(makeUser()),
    )
    const response = await sut.add(makeUserModel())
    expect(response).toBe(null)
  })

  it('Should return an User on success', async () => {
    const { sut } = makeSut()
    const user = await sut.add(makeUserModel())

    expect(user).toEqual(new User({ ...makeUserModel(), id: user?.id }))
    expect(user).toBeInstanceOf(User)
  })
})
