import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { DeveloperType } from './developers.types'
import * as mongoose from 'mongoose';
import { User } from '../users/users.schema';

export type DevelopersDocument = DeveloperType & Document

@Schema()
class Developer {
  @Prop()
  name: string

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  users: User[]

  @Prop()
  investments: string[]

  @Prop()
  images: string[]
}

export const DevelopersSchema = SchemaFactory.createForClass(Developer)
