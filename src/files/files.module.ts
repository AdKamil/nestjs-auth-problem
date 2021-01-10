import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    MulterModule.register({
      dest: './public/images',
    })
  ]
})
export class FilesModule {}
