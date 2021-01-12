import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserType } from './users.types'
import { UsersDocument } from './users.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose"
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly usersModule: Model<UsersDocument>) {}

  async register(userData: UserType): Promise<UserType> {
    const { email } = userData

    const user = await this.usersModule.findOne({ email }).exec()

    if (user) {
      throw new ConflictException('User already exists')
    }

    const { password, ...userDataWithoutPassword } = userData

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await this.usersModule.create({ password: hashedPassword, ...userDataWithoutPassword })

    const {
      _doc: {
        password: createdUserPassword,
        ...createdUserWithoutPassword
      }
    } = createdUser

    return createdUserWithoutPassword
  }

  async findOne(email: string, withPassword = true): Promise<UserType | undefined> {
    const user = await this.usersModule.findOne({ email }).exec()

    if (!user) throw new NotFoundException('User not found')

    if (!withPassword) {
      const {
        _doc: {
          password: userPassword,
          ...userWithoutPassword
        }
      } = user

      return userWithoutPassword
    }

    return user
  }

  async findOneById(userId: string): Promise<UserType | undefined> {
    const user = await this.usersModule.findOne({ _id: userId }).exec()

    if (!user) throw new NotFoundException('User not found')

    const {
      _doc: {
        password: userPassword,
        ...userWithoutPassword
      }
    } = user

    return userWithoutPassword
  }

  async updateUser(userId: string, userData: UserType): Promise<UserType> {

    try {
      const updatedUser = await this.usersModule.findByIdAndUpdate(userId, userData)

      const {
        _doc: {
          password: userPassword,
          ...userWithoutPassword
        }
      } = updatedUser

      return userWithoutPassword
    } catch (e) {
      throw new BadRequestException(e)
    }
  }
}
