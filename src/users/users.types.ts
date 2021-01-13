export type UserType = {
  _id?: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string
  userId?: number,
  username?: string,
  roles?: string[],
  developer?: string,
  _doc?: any
}

export interface IValidateUser {
  firstname?: string,
  lastname?: string,
  email?: string,
  password: string
  userId?: number,
  username?: string,
  roles?: string[],
  developer?: string,
}
