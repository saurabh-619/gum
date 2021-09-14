import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { Rating } from './Rating.entity';
import { RatingService } from './rating.service';

const pubSub = new PubSub();

@Resolver()
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Query((returns) => String)
  helloThere(): string {
    return 'Hello There!';
  }

  @Subscription((returns) => Rating)
  newRatingAdded(@Args('id') id: number) {
    return pubSub.asyncIterator(`newRatingAdded-${id}`);
  }

  @Mutation((returns) => Boolean)
  async createARating(
    @Args('productId') productId: number,
    @Args() data: CreateRatingDto,
  ): Promise<boolean> {
    try {
      const rating = await this.ratingService.createARating(productId, data);
      pubSub.publish(`newRatingAdded-${rating.product.id}`, {
        newRatingAdded: rating,
      });
      return true;
    } catch (e) {
      console.log({ e });
      return false;
    }
  }

  @Query((returns) => [Rating])
  async getAllRatings(): Promise<Rating[]> {
    return this.ratingService.getAllRatings();
  }

  @Query((returns) => [Rating])
  async getAllRatingsOfAProduct(
    @Args('productId') productId: number,
  ): Promise<Rating[]> {
    return this.ratingService.getAllRatingsOfAProduct(productId);
  }
}
