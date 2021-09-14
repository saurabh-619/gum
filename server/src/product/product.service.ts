import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product';
import { Product } from './Product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.find({
      relations: ['ratings'],
      order: { timestamp: 'ASC' },
    });
  }

  async getAProduct(productId: number): Promise<Product> {
    return this.productRepo.findOne(productId);
  }

  async createAProduct(@Args() data: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }
}
