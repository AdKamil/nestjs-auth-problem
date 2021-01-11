import { BadRequestException, HttpStatus, Injectable, UnauthorizedException, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilesDocument } from './files.schema';
import { Model } from 'mongoose';
import { FileType } from './files.types';
import { UsersService } from '../users/users.service';
import { UserType } from '../users/users.types';
import { DevelopersService } from '../developers/developers.service';
import * as fs from 'fs';
import { getFileType } from './helpers';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel('Files') private readonly filesModule: Model<FilesDocument>,
    private usersService: UsersService,
    private developersService: DevelopersService
  ) {}

  async register(fileData, userData: UserType, givenDeveloperId: string): Promise<FileType> {
    const user = await this.usersService.findOne(userData.email)

    let developer = null

    if (user?.roles.includes('developer') && !user?.roles.includes('superadmin' || 'admin')) {

      developer = await this.developersService.findOneByUserId(userData.userId)

    } else if (user.roles.includes('superadmin' || 'admin') && givenDeveloperId) {

      developer = await this.developersService.findOne(givenDeveloperId)

    } else {

      throw new UnauthorizedException('Not authorized')

    }

    let fileToSave = null

    if (Array.isArray(fileData)) {

      fileToSave = fileData.map(f => ({
        name: f.filename,
        type: getFileType(f.filename),
        developer: [developer._id]
      }))


    } else {

      fileToSave = new this.filesModule({
        name: fileData.filename,
        type: getFileType(fileData.filename),
        developer: [developer._id]
      })
    }

    if (developer) {
      try {

        if (Array.isArray(fileData)) {
          return this.filesModule.insertMany(fileToSave)
        }

        return await fileToSave.save()

      } catch (e) {

        throw new BadRequestException(e)

      }
    }
  }
}
