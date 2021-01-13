// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.types';
import { UpdateUserDto } from '../users/users.dto';
import { UserType } from '../users/users.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload): Promise<UserType> {
    const user = await this.usersService.findOne(payload.email, false)

    console.log('validate', user)

    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }

    return {
      userId: payload.sub,
      email: payload.email,
      developer: user.developer,
      roles: user.roles
    }
  }
}
