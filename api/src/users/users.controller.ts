import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService, UserEntity } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() body: { email: string; name?: string }): Promise<UserEntity> {
    return this.usersService.create(body);
  }
}
