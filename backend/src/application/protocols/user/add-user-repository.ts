import { User } from '@/src/domain/entities/user'

export interface AddUserRepository {
  add(userData: User): Promise<User | null>
}
