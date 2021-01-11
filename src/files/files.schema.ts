import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { FileType } from './files.types'
import * as mongoose from 'mongoose';
import { Developer } from '../developers/developers.schema';

export type FilesDocument = FileType & Document

@Schema()
class File {
  @Prop({
    type: String,
    required: true
  })
  name: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' })
  developer: Developer[]

  @Prop({
    type: String,
    required: true,
    enum: ['image', 'pdf']
  })
  type: string
}

export const FilesSchema = SchemaFactory.createForClass(File)
