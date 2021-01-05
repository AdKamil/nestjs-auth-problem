import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { User } from './users.types'
import { UsersDocument } from './users.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose"
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly usersModule: Model<UsersDocument>) {}
  async register(userData: User): Promise<User> {
    const { email } = userData

    const user = await this.usersModule.findOne({ email }).exec()

    if (user) {
      throw new ConflictException('User already exists')
    }

    const { password, ...userDataWithoutPassword } = userData

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    return this.usersModule.create({ password: hashedPassword, ...userDataWithoutPassword })
  }

  async findOne(email: string, withPassword = true): Promise<User | undefined> {
    const user = await this.usersModule.findOne({ email })

    if (!user) throw new NotFoundException('User not found')

    if (!withPassword) {
      const temp = { ...user }
      const userWithoutPassword = temp._doc
      delete userWithoutPassword.password

      return userWithoutPassword
    }

    return user
  }
}
