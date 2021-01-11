import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, filterFileType } from './helpers';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { FilesService } from './files.service';
import { logToFile } from '../helpers/logToFile';
import fs from 'fs';

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

    console.log(response)

    // fs.writeFile('loggggggggg.json', JSON.stringify(response, null, 2), err => console.log(err))

    await this.filesService.register(response, req.user, givenDeveloperId)

    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response
    }
  }
}
