import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '../users/users.types';
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, requestPassword: string): Promise<User | null> {
    const user = await this.usersService.findOne(email)

    if (user && await bcrypt.compare(requestPassword, user.password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async register(userData: User): Promise<User> {
    return await this.usersService.register(userData)
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user._id })
    }
  }
}
