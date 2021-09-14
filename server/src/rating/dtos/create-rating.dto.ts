import { ArgsType, OmitType } from '@nestjs/graphql';
import { Rating } from '../Rating.entity';

@ArgsType()
export class CreateRatingDto extends OmitType(
  Rating,
  ['id', 'product'],
  ArgsType,
) {}
