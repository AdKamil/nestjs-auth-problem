import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { UsersService } from './users/users.service'
import { AppService } from './app.service'
import { LoginUserDto, RegisterUserDto } from './users/users.dto'
import { LoginResponse } from './auth/auth.types'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly  usersService: UsersService, private readonly appService: AppService) {}

  @Get()
  hello () {
    return this.appService.getHello()
  }

  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {

    return this.authService.register(registerUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.email, false)
  }
}
