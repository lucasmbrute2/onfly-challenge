import { AddUserRepository } from '@/src/application/protocols/user'
import { User } from '@/src/domain/entities/user'
import { PrismaClient } from '@prisma/client'
import { PrismaUserMapper } from './mappers/user-mapper'

export class PrismaUserRepository implements AddUserRepository {
  private readonly prisma = new PrismaClient()

  async add(userData: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(userData),
    })

    return PrismaUserMapper.toDomain(user)
  }
}
