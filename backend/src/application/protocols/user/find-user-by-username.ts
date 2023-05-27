import { User } from '@/src/domain/entities/user'

export interface FindUserByUsernameRepository {
  findByUsername(username: string): Promise<User | null>
}
