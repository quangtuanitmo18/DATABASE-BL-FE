import { User } from './user.type'

export type LoginUserBody = Pick<User, 'username' | 'password'>
export type LoginUserResponse = User & { accessToken: string }
