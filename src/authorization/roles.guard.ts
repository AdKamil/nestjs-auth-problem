import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from './role.enum'
import { ROLES_KEY } from './roles.decorator'
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler())

    // @ts-ignore
    const shouldSkip = this.reflector.getAllAndMerge<boolean>('SHOULD_SKIP_AUTH', [context.getHandler(), context.getClass()])

    if (!roles) {
      return true
    }


    const { user } = context.switchToHttp().getRequest()

    console.log('role guard',user)

    return /*roles.some((role) => user?.roles?.includes(role))*/ true
  }
}
