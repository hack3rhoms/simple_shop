import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  // POST /products
  @Post()
  create(
    @Body()
    body: {
      name: string;
      description?: string;
      price: number;
      imageUrl?: string;
    },
  ) {
    return this.productsService.create(body);
  }
}
