import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './users.types';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Superadmin)
  @Get('find')
  async find(@Query('email') email): Promise<UserType> {
    return await this.usersService.findOne(email, false)
  }
}
