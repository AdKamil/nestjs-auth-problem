import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserType } from '../users/users.types';
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './auth.types';
import { UpdateUserDto, ValidateUserDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserType | null> {

    const user = await this.usersService.findOne(email)

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async register(userData: UserType): Promise<UserType> {
    return await this.usersService.register(userData)
  }

  async login(user: UserType): Promise<LoginResponse> {
    const foundUser = await this.usersService.findOne(user.email)

    return {
      access_token: this.jwtService.sign({ email: user.email, sub: foundUser._id })
    }
  }
}
