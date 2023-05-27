import { describe, expect, it, vi } from 'vitest'
import { AddUserRepository } from '../protocols/user'
import {
  makeAddUserRepository,
  makeFindByUsernameRepositoryStub,
  makeHasherStub,
  makeUserModel,
} from '../tests/factories'
import { DbAddUserUseCase } from './db-add-user'
import { User } from '@/src/domain/entities/user'
import { makeUser } from '@/src/domain/entities/tests/factories'
import { Hasher } from '../protocols/cryptography'
import { FindUserByUsernameRepository } from '../protocols/user/find-user-by-username'

interface SutTypes {
  sut: DbAddUserUseCase
  addUserRepositoryStub: AddUserRepository
  findUserByUsernameRepository: FindUserByUsernameRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository()
  const findUserByUsernameRepository = makeFindByUsernameRepositoryStub()
  const hasherStub = makeHasherStub()

  const dbAddUserUseCase = new DbAddUserUseCase(
    hasherStub,
    addUserRepositoryStub,
    findUserByUsernameRepository,
  )

  return {
    sut: dbAddUserUseCase,
    addUserRepositoryStub,
    findUserByUsernameRepository,
    hasherStub,
  }
}

describe('DbAddUser Use Case', () => {
  it('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = vi.spyOn(hasherStub, 'hash')

    const addAccountParams = makeUserModel()
    await sut.add(addAccountParams)

    expect(hashSpy).toHaveBeenCalledWith(addAccountParams.password)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    vi.spyOn(hasherStub, 'hash').mockRejectedValueOnce(
      Promise.resolve(new Error()),
    )
    const promise = sut.add(makeUserModel())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddUserRepository with correct values', async () => {
    const { addUserRepositoryStub, sut } = makeSut()
    const addSpy = vi.spyOn(addUserRepositoryStub, 'add')

    const response = await sut.add(makeUserModel())
    const user = new User({ ...makeUserModel(), id: response?.id })
    expect(addSpy).toHaveBeenCalledWith(user)
  })

  it('Should return null if FindUserByIdRepository reach an user', async () => {
    const { sut, findUserByUsernameRepository } = makeSut()
    vi.spyOn(
      findUserByUsernameRepository,
      'findByUsername',
    ).mockReturnValueOnce(Promise.resolve(makeUser()))
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
