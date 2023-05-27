import { User } from '@/src/domain/entities/user'

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>
}
