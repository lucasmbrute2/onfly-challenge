import { describe, expect, it, vi } from 'vitest'
import { AddUserRepository } from '../protocols'
import { makeAddUserRepository, makeUserModel } from '../tests/factories'
import { DbAddUserUseCase } from './db-add-user'
import { User } from '@/src/domain/entities/user'

interface SutTypes {
  sut: DbAddUserUseCase
  addUserRepositoryStub: AddUserRepository
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository()
  const dbAddUserUseCase = new DbAddUserUseCase(addUserRepositoryStub)

  return {
    sut: dbAddUserUseCase,
    addUserRepositoryStub,
  }
}

describe('DbAddUser Use Case', () => {
  it('Should call AddCompanyRepository with correct values', async () => {
    const { addUserRepositoryStub, sut } = makeSut()
    const addSpy = vi.spyOn(addUserRepositoryStub, 'add')

    const response = await sut.add(makeUserModel())
    const user = new User({ ...makeUserModel(), id: response?.id })
    expect(addSpy).toHaveBeenCalledWith(user)
  })

  it('Should return an User on success', async () => {
    const { sut } = makeSut()
    const user = await sut.add(makeUserModel())

    expect(user).toEqual(new User({ ...makeUserModel(), id: user?.id }))
    expect(user).toBeInstanceOf(User)
  })
})
