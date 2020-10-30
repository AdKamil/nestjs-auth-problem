import { Controller, Get, Post, Body, UnprocessableEntityException, Delete, Param } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto'
import { TestService } from './test.service'
import { Test } from './interfaces/test.interface'

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto): Promise<Test> {
    if (!createTestDto.name) {
      throw new UnprocessableEntityException('Please provide name')
    }
    return this.testService.create(createTestDto)
  }

  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll()
  }

  @Delete(':name')
  async deleteOne(@Param('name') name: string): Promise<Error | number> {
    return this.testService.deleteOne(name)
  }
}
