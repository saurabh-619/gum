import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateProductDto } from './dtos/create-product';
import { Product } from './Product.entity';
import { ProductService } from './product.service';

const pubSub = new PubSub();

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productServices: ProductService) {}

  @Subscription((returns) => Product)
  newProductAdded() {
    return pubSub.asyncIterator('newProductAdded');
  }

  @Query((returns) => [Product])
  getAllProducts(): Promise<Product[]> {
    return this.productServices.getAllProducts();
  }

  @Query((returns) => Product)
  getAProduct(@Args('productId') productId: number): Promise<Product> {
    return this.productServices.getAProduct(productId);
  }

  @Mutation((returns) => Boolean)
  async createAProduct(@Args() data: CreateProductDto): Promise<boolean> {
    try {
      const product = await this.productServices.createAProduct(data);
      pubSub.publish('newProductAdded', { newProductAdded: product });
      console.log({ product });
      return true;
    } catch (e) {
      return false;
    }
  }
}
