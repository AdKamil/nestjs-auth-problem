import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DevelopersDocument } from './developers.schema';
import { DeveloperType } from './developers.types';
import { UserType } from '../users/users.types';
import { Model } from 'mongoose';

@Injectable()
export class DevelopersService {
  constructor(@InjectModel('Developers') private readonly developersModule: Model<DevelopersDocument>) {}

  async findOne(id: string): Promise<DeveloperType> {
    return await this.developersModule.findOne({ _id: id }).exec()
  }

  async findOneByUserId(id): Promise<DeveloperType> {
    return await this.developersModule.findOne({ users: id }).exec()
  }

  async register(developerData: DeveloperType, userData: UserType): Promise<DeveloperType> {
    const existingDeveloper = await this.developersModule.findOne({ name: developerData.name }).exec()

    if (existingDeveloper) throw new ConflictException('Developer already exists')

    const developer = new this.developersModule({ ...developerData, users: [userData.userId] })

    return await developer.save()
  }

  async update(developerData: DeveloperType, userId: string): Promise<DeveloperType> {
    if (!developerData._id) throw new BadRequestException('Need eveloper id')

    let developer = null

    try {
      developer = await this.findOne(developerData._id)
    } catch (e) {
      throw new BadRequestException('Wrong developer id', e)
    }

    if (developer.users.includes(userId)) {
      return this.developersModule.findByIdAndUpdate(developerData._id, developerData, { new: true })
    }

    throw new UnauthorizedException()
  }
}
