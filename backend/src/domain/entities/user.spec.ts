import { describe, expect, it } from 'vitest'
import { User } from './user'
import { makeUserProps } from './tests/factories'

interface SutTypes {
  sut: User
}

const makeSut = (): SutTypes => ({
  sut: new User(makeUserProps()),
})

describe('User entity', () => {
  it('shoud be able to instance User with correct values', () => {
    const { sut } = makeSut()

    expect(sut).toBeInstanceOf(User)
    expect(sut).toMatchObject(makeUserProps())
  })
})
