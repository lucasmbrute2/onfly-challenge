import { randomUUID } from 'node:crypto'

export interface UserProps {
  id: string
  name: string
  username: string
  password: string
}

export class User {
  constructor(private props: UserProps) {
    this.props = {
      ...props,
      id: this.props.id ?? randomUUID(),
    }
  }

  set id(id: string) {
    this.props.id = id
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get username(): string {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }
}
