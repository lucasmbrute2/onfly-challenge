import { User } from '@/src/domain/entities/user'

export class UserView {
  static toHttp(user: User): Partial<User> {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      password: user.password,
    }
  }
}
