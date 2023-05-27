import { User } from '@/src/domain/entities/user'
import { User as PrismaUserEntity } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma = (user: User): PrismaUserEntity => {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
      username: user.username,
    }
  }

  static toDomain = (user: PrismaUserEntity): User => {
    return new User({
      id: user.id,
      name: user.name,
      password: user.password,
      username: user.username,
    })
  }
}
