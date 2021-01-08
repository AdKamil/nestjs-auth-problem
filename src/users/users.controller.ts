import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.types';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get('find')
  async find(@Query('email') email): Promise<User> {
    return await this.usersService.findOne(email, false)
  }
}
