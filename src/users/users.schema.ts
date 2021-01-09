import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserType } from './users.types'

export type UsersDocument = UserType & Document

@Schema()
export class User {
  @Prop()
  firstname: string

  @Prop()
  lastname: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
