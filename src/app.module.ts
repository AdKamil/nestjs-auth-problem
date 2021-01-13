/* eslint-disable */
import { UsersService } from './users/users.service';

require('dotenv').config()
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './authorization/roles.guard';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';
import { DevelopersModule } from './developers/developers.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`),
    AuthModule,
    UsersModule,
    FilesModule,
    DevelopersModule,
    MulterModule.register({
      dest: './public/images',
    })
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
