import { User } from '../entities/user'

export interface AddUserModel {
  id: string
  name: string
  password: string
  username: string
}

export interface AddUser {
  add(user: AddUserModel): Promise<User | null>
}
