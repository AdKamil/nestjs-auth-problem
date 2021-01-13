import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DeveloperType } from './developers.types';
import { DevelopersDTO } from './developers.dto';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';
import PassportModule from '@nestjs/passport'
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('developers')
export class DevelopersController {
  constructor(private developersService: DevelopersService) {}

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.developersService.findOne(id)
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async register(@Body() developerData: DevelopersDTO, @Request() req): Promise<DeveloperType> {

    return await this.developersService.register(developerData, req.user)
  }

  @UseGuards(LocalAuthGuard)
  @Patch()
  async update(@Body() developerData: DevelopersDTO, @Request() req): Promise<DeveloperType> {
    return await this.developersService.update(developerData, req.user.userId)
  }
}
