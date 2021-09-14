import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/Product.entity';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { Rating } from './Rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private readonly ratingsRepo: Repository<Rating>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getAllRatings(): Promise<Rating[]> {
    return this.ratingsRepo.find({
      relations: ['Product'],
      order: { timestamp: 'DESC' },
    });
  }

  async getAllRatingsOfAProduct(productId: number): Promise<Rating[]> {
    return this.ratingsRepo.find({
      where: { product: { id: productId } },
      relations: ['product'],
      order: { timestamp: 'DESC' },
    });
  }

  async createARating(
    productId: number,
    data: CreateRatingDto,
  ): Promise<Rating> {
    const product = await this.productRepo.findOne(+productId);
    const rating = this.ratingsRepo.create({ ...data, product });
    return this.ratingsRepo.save(rating);
  }
}
