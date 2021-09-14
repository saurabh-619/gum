import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver, ProductService],
  exports: [],
})
export class ProductModule {}
