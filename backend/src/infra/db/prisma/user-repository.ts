import {
  AddUserRepository,
  FindUserByIdRepository,
} from '@/src/application/protocols/user'
import { User } from '@/src/domain/entities/user'
import { PrismaClient } from '@prisma/client'
import { PrismaUserMapper } from './mappers/user-mapper'

export class PrismaUserRepository
  implements AddUserRepository, FindUserByIdRepository
{
  private readonly prisma = new PrismaClient()

  async add(userData: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(userData),
    })

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null
    return PrismaUserMapper.toDomain(user)
  }
}
