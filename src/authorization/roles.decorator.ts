import { SetMetadata } from '@nestjs/common'
import { Role } from './role.enum'

export const ROLES_KEY = 'roles';
export const HasRoles = (...hasRoles: string[]) => SetMetadata(ROLES_KEY, hasRoles)
