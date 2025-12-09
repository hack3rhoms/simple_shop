import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService, UserEntity } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ADMIN ONLY → إرجاع كل المستخدمين
  @Roles('ADMIN')
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  // ADMIN ONLY → إرجاع مستخدم واحد
  @Roles('ADMIN')
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntity | null> {
    return this.usersService.findOne(id);
  }

  // ممنوع: إنشاء مستخدم من هنا
  // التسجيل الصحيح عبر auth/register فقط
}
