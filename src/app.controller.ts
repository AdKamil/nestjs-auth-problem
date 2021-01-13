import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service'
import { AppService } from './app.service'
import { LoginUserDto, RegisterUserDto } from './users/users.dto'
import { LoginResponse } from './auth/auth.types'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly  usersService: UsersService, private readonly appService: AppService) {}

  @Get()
  hello () {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.email, false)
  }
}
