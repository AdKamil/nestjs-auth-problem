import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserType } from './users.types'
import * as mongoose from 'mongoose';
import { Developer } from '../developers/developers.schema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' })
  developer: Developer
}

export const UserSchema = SchemaFactory.createForClass(User)
