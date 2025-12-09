import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface UserEntity {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // إرجاع كل المستخدمين
  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  // إرجاع مستخدم واحد حسب id
  findOne(id: number): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // لا تستخدم create هنا لأن التسجيل يتم عبر AuthService فقط
  create() {
    throw new Error('Use /auth/register instead');
  }
}
