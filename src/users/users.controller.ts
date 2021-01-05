import { Controller, Get, Param, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './users.types'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('find')
  async find(@Query('email') email): Promise<User> {
    return await this.usersService.findOne(email)
  }
}
