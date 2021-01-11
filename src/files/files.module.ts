import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesSchema } from './files.schema';
import { UsersModule } from '../users/users.module';
import { DevelopersModule } from '../developers/developers.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    UsersModule,
    DevelopersModule,
    MulterModule.register({
      dest: './public/images',
    }),
    MongooseModule.forFeature([
      {
        name: 'Files',
        schema: FilesSchema
      }
    ])
  ]
})
export class FilesModule {}
