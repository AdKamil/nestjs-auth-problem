import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  firstname: string

  @ApiProperty()
  lastname: string

  @ApiProperty()
  password: string

  @ApiProperty()
  roles: string[]
}

export class UpdateUserDto {
  @ApiProperty()
  _id: string

  @ApiProperty()
  firstname: string

  @ApiProperty()
  lastname: string

  @ApiProperty()
  password: string

  @ApiProperty()
  roles: string[]

  @ApiProperty()
  developer: string
}

export class LoginUserDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

export class LoginResponse {
  @ApiProperty()
  access_token: string
}
