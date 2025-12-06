import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// نوع المستخدم اللي حنستعمله في الطبقات العليا (controller مثلاً)
export interface UserEntity {
  id: number;
  email: string;
  name: string | null;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // إرجاع كل المستخدمين
  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  // إرجاع مستخدم واحد حسب الـ id
  findOne(id: number): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // إنشاء مستخدم جديد
  create(data: { email: string; name?: string }): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
    });
  }
}
