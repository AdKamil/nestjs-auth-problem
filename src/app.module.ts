/* eslint-disable */
require('dotenv').config()
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './TestModule/test.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`),
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
