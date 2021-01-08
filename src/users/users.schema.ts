import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { User } from './users.types'

export type UsersDocument = User & Document

@Schema()
class UserSchemaClass {
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

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass)
