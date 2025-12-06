/* eslint-disable @typescript-eslint/no-unsafe-return,
                  @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// النوع اللي حنستعمله خارجياً للمنتجات (اختياري، بس مفيد)
export interface ProductEntity {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // إرجاع كل المنتجات
  findAll(): Promise<ProductEntity[]> {
    return this.prisma.product.findMany();
  }

  // إرجاع منتج واحد حسب id
  findOne(id: number): Promise<ProductEntity | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // إنشاء منتج جديد
  create(data: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  }): Promise<ProductEntity> {
    return this.prisma.product.create({
      data,
    });
  }
}
