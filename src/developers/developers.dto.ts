import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.schema';

export class DevelopersDTO {
  @ApiProperty()
  name: string

  @ApiProperty({ type: User })
  users: string[]

  @ApiProperty()
  investments: string[]

  @ApiProperty()
  images: string[]
}
