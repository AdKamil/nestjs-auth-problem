import {
  Body,
  Controller, Delete,
  HttpStatus,
  Post, Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, filterFileType } from './helpers';
import { diskStorage } from 'multer';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { HasRoles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { FilesService } from './files.service';
import { logToFile } from '../helpers/logToFile';
import fs from 'fs';
import { AuthGuard } from '@nestjs/passport';
import PassportModule from '@nestjs/passport'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
        filename: editFileName
      }),
      fileFilter: filterFileType
    }),
  )
  async uploadedFile(@UploadedFile() file, @Req() req, @Body('givenDeveloperId') givenDeveloperId) {
    await this.filesService.register(file, req.user, givenDeveloperId)

    const response = {
      originalname: file.originalname,
      filename: file.filename,
    }

    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './public/images',
        filename: editFileName
      }),
      fileFilter: filterFileType
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Req() req, @Body('givenDeveloperId') givenDeveloperId) {
    const response = [];

    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename
      }
      response.push(fileReponse)
    })

    await this.filesService.register(response, req.user, givenDeveloperId)

    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response
    }
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('name') name: string): Promise<{ ok?: number; n?: number; }> {
    return await this.filesService.removeOne(name)
  }
}
