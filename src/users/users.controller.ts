import { Body, Controller, Delete, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './users.types';
import { HasRoles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { UpdateUserDto } from './users.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  @HasRoles(Role.Superadmin)
  @Get()
  async find(@Query('email') email): Promise<UserType> {
    return await this.usersService.findOne(email, false)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @HasRoles(Role.Developer)
  @Patch()
  async update(@Body() userData: UpdateUserDto, @Req() req): Promise<UserType> {
    return await this.usersService.updateUser(req.user.userId, userData)
  }
}
