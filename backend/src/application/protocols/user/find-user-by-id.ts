import { User } from '@/src/domain/entities/user'

export interface FindUserByIdRepository {
  find(id: string): Promise<User | null>
}
