import { Module } from '@nestjs/common';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevelopersSchema } from './developers.schema';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [DevelopersService],
  controllers: [DevelopersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Developers',
        schema: DevelopersSchema
      }
    ]),
    UsersModule
  ]
})
export class DevelopersModule {}
