import { User, UserProps } from '../../user'

export const makeUserProps = (): UserProps => ({
  id: 'any-id',
  name: 'any-name',
  password: 'any-password',
  username: 'any-username',
})

export const makeUser = (override?: Partial<User>) => {
  return new User({
    ...makeUserProps(),
    ...override,
  })
}
