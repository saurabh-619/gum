import { Module } from '@nestjs/common';
import { RatingResolver } from './rating.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './Rating.entity';
import { RatingService } from './rating.service';
import { Product } from 'src/product/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rating]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
