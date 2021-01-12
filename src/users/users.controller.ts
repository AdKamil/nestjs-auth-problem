import { Body, Controller, Delete, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './users.types';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { UpdateUserDto } from './users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Superadmin)
  @Get()
  async find(@Query('email') email): Promise<UserType> {
    return await this.usersService.findOne(email, false)
  }

  @Roles(Role.Admin)
  @Patch()
  async update(@Body() userData: UpdateUserDto, @Req() req): Promise<UserType> {
    return await this.usersService.updateUser(req.user.userId, userData)
  }
}
