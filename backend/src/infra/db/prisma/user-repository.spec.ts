import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { PrismaUserRepository } from './user-repository'
import { makeUser } from '@/src/domain/entities/tests/factories'
import { User } from '@/src/domain/entities/user'

const makeSut = (): PrismaUserRepository => {
  return new PrismaUserRepository()
}

describe('UserRepository', () => {
  const prisma = new PrismaClient()
  let schema: string

  beforeAll(() => {
    if (!process.env.DATABASE_URL) {
      throw new Error('Please provide a DATABASE_URL environment variable')
    }
    schema = randomUUID()
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    process.env.DATABASE_URL = url.toString()
    execSync('npx prisma migrate deploy')
  })

  afterAll(async () => {
    await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })

  // add()
  it('Should return an user on success', async () => {
    const sut = makeSut()
    const user = await sut.add(makeUser())

    expect(user).toBeInstanceOf(User)
    expect(user).toBeTruthy()
    expect(user).toEqual(makeUser())
  })
})
